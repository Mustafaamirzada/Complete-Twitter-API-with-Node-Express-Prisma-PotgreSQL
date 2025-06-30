import express from 'express';
import { createNewComment, deleteCommentById, getAllComments, getCommentsByPostId, getCommentsByUserId, updateCommentById } from '../controllers/Comment.Controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/", protectRoute, getAllComments);
router.get("/user/:id", protectRoute, getCommentsByUserId);
router.get("/post/:id", protectRoute, getCommentsByPostId);
router.post("/create", protectRoute, createNewComment);
router.put("/update/:id", protectRoute, updateCommentById);
router.delete("/:id", protectRoute, deleteCommentById);

export default router;