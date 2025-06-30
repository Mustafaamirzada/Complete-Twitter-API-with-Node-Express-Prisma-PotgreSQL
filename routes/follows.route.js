import express from "express";
import { followUserById, getFollowers, getFollowersById, getFollowingById, unFollowUserById } from "../controllers/Follow.Controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getFollowers);
router.get("/follower/:id", protectRoute, getFollowersById);
router.get("/following/:id/", protectRoute, getFollowingById);
router.post("/:id", protectRoute, followUserById);
router.delete("/:id", protectRoute, unFollowUserById);

export default router;