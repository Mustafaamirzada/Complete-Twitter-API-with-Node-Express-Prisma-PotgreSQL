import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRoute from './routes/auth.route.js';
import userRoutes from './routes/users.route.js';
import postsRoute from './routes/posts.route.js';
import followRoute from './routes/follows.route.js';
import likeRoute from './routes/likes.route.js';
import commentRoute from './routes/comments.route.js';
import tweetRoute from './routes/tweets.route.js';

configDotenv();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoute);
app.use('/api/follow', followRoute);
app.use('/api/likes', likeRoute);
app.use('/api/comments', commentRoute);
app.use('/api/tweets', tweetRoute);


app.listen(4000, () => {
  console.error("Server Runing on Port 4000");
})