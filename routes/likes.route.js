import express from 'express';
import { dislikePostById, getAllLikes, getLikeByPostId, getLikeByUserId, likePostById } from '../controllers/Like.Controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/", protectRoute, getAllLikes);
router.get("/user/:id", protectRoute, getLikeByUserId);
router.get("/post/:id", protectRoute, getLikeByPostId);
router.post("/:id", protectRoute, likePostById);
router.delete("/:id", protectRoute, dislikePostById);

export default router;