import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getMyGroups, isAdmin } from "../utils/groupHelper.js";
import { generateGravatar } from "../utils/gravatarHelper.js";

// @desc    Get all of the users
// router   /api/user
// @access  private
const getUsers = asyncHandler(async (req, res) => {
  try {
    // find all users
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
});

// @desc    Register new user
// route    /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  // generate an avatar
  const avatar = generateGravatar(email);

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (user) {
    // generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user
// route    /api/user/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // get all groups of user
    const group = await getMyGroups(user._id);
    // generate token
    generateToken(res, user._id);
    // return
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      group,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout User
// route    POST/api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(401);
    throw new Error("User doesn't exist.");
  }

  const user = {
    _id: userExist.user._id,
    name: userExist.user.name,
    email: userExist.user.email,
  };

  res.status(200).json(user);
};

// @desc    Update user profile
// route    /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
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
      email: updatedUser.email,
      group: updatedUser.group,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    return res.status(!res ? 400 : 200).json({ success: !user ? false : true });
  } catch (error) {
    console.error(`Fail trying to remove user`, error);
  }
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // validate role
  const admin = isAdmin(req.user.group);

  // if not admin
  if (!admin) {
    res.status(403); // not authorized
    throw new Error("Insufficient access.");
  }

  try {
    // find user
    const user = await User.findById(id);

    // if not user found
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // two field that will be updated
    user.name = req.body.name;
    user.email = req.body.email;

    user.save(); // save changes

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

export {
  getUsers,
  registerUser,
  authUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  deleteUser,
  updateUserInfo,
};
