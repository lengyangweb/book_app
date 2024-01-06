import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getGroups, getUserGroups } from "../controllers/groupsController.js";

// init router
const router = express.Router();

router.route("/").get(protect, getGroups);
router.route("/:id").get(protect, getUserGroups);

export default router;
