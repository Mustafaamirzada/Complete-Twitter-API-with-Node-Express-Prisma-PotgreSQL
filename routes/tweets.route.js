import express from 'express';
import { createTweet, deleteTweetById, getAllTweets, getTweetByPostId, getTweetByUserId, updateTweet } from '../controllers/Tweet.Controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getAllTweets);
router.post('/:id', protectRoute, createTweet);
router.get('/user/:id', protectRoute, getTweetByUserId);
router.get('/post/:id', protectRoute, getTweetByPostId);
router.put('/update/:id', protectRoute, updateTweet);
router.delete('/delete/:id', protectRoute, deleteTweetById);

export default router;