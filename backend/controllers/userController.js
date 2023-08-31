import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from "../models/User.js";

// @desc    Get all of the users
// router   /api/user
// @access  private
const getUsers = asyncHandler(async(req, res) => {
    try {
        // find all users
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
    }
})

// @desc    Register new user
// route    /api/user
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exist');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        // generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user
// route    /api/user/auth
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            group: user.group
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
});

// @desc    Logout User
// route    POST/api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// route    /api/user/profile
// @access  Private
const getUserProfile = async(req, res) => {

    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
        res.status(401);
        throw new Error("User doesn't exist.");
    }

    const user = {
        _id: userExist.user._id,
        name: userExist.user.name,
        email: userExist.user.email
    }
    
    res.status(200).json(user);
}

// @desc    Update user profile
// route    /api/user/profile
// @access  Private
const updateUserProfile = async(req, res) => {
    // get user that's trying to update
    let user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}

const deleteUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);

        return res.status(!res ? 400 : 200).json({ success: !user ? false : true });

    } catch (error) {
        console.error(`Fail trying to remove user`, error);
    }
});

const updateUserInfo = asyncHandler(async(req, res) => {
    const { id } = req.params;

    // validate role
    const admin = isAdmin(req.user.group);

    // if not admin
    if (!admin) {
        res.status(403); // not authorized
        throw new Error('Insufficient access.');
    }
    
    try {
        // find user
        const user = await User.findById(id);

        // if not user found
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        // two field that will be updated
        user.name = req.body.name;
        user.email = req.body.email;

        user.save(); // save changes

        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
    }
})

const addGroup = asyncHandler(async (req, res) => {
    
    const { id } = req.params;

    // check if current user is admin
    const admin = isAdmin(req.user.group);

    // if user not admin
    if (!admin) {
        res.status(401);
        throw new Error('Insufficient access.');
    }

    // get user
    const user = await User.findById(id);

    // if user doesn't exist
    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }

    // add group to user
    const result = await User.findOneAndUpdate(id, { 
        $push: {
            group: req.body.group
        }
    });

    if (!result) {
        res.status(400);
        throw new Error('Unable to add group.');
    }

    res.status(200).json({ message: 'Group has been added.' });

})

export {
    getUsers,
    registerUser,
    authUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    deleteUser,
    addGroup,
    updateUserInfo
}