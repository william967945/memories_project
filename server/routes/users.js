import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost, signin, signup } from "../controllers/posts.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;