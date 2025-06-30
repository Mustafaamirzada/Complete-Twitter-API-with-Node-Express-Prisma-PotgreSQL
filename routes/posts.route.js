import express from "express";
import { createNewPost, deletePostById, getAllPosts, getPostById, updatePostById } from "../controllers/post.Controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const postsRoute = express.Router();

postsRoute.get("/all", protectRoute, getAllPosts);
postsRoute.get("/:id", protectRoute, getPostById);
postsRoute.post("/create", protectRoute, createNewPost);
postsRoute.put("/update/:id", protectRoute, updatePostById);
postsRoute.delete("/:id", protectRoute, deletePostById);

export default postsRoute;