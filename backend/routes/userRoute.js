<<<<<<< HEAD
import express from 'express';
import { authUser, logoutUser, getUserProfile, registerUser, updateUserProfile, addGroup, getUsers, deleteUser, updateUserInfo, removeGroup } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
=======
import express from "express";
import {
  authUser,
  logoutUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUserInfo,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
>>>>>>> master

// init router
const router = express.Router();

<<<<<<< HEAD
router.route('/').get(getUsers).post(protect, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/group/:id').post(protect, addGroup).delete(protect, removeGroup);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUserInfo);
=======
router.route("/").get(getUsers).post(protect, registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser).put(protect, updateUserInfo);
>>>>>>> master

export default router;
