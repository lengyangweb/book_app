import express from 'express';
import { authUser, logoutUser, getUserProfile, registerUser, updateUserProfile, addGroup, getUsers, deleteUser, updateUserInfo } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

// init router
const router = express.Router();

router.route('/').get(getUsers).post(protect, registerUser);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUserInfo);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/group/:id').post(protect, addGroup)

export default router;