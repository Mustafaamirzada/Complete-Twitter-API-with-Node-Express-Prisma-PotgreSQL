import express from "express";
import { deletedUserById, getAllUsers, getUserProfile, updateUser } from "../controllers/User.Controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/all", protectRoute, getAllUsers);
router.get("/profile/:id", protectRoute, getUserProfile);
router.put("/update/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deletedUserById);

export default router;