import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

// http://localhost:5000/posts
// read
router.get('/', getPosts);
//create
router.post('/', createPost);
//update
router.patch('/:id', updatePost);
// delete
router.delete('/:id', deletePost); 
router.patch('/:id/likePost', likePost);

export default router;