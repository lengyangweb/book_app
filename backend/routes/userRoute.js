import express from 'express';
import { authUser, logoutUser, getUserProfile, registerUser, updateUserProfile, addGroup } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

// init router
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/group/:id').post(protect, addGroup).delete()

export default router;