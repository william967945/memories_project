import axios from 'axios';

const url = 'http://localhost:5000/posts';

// CRUD FUNCTIONS

// read, get, fetch
export const fetchPosts = () => axios.get(url); 
// create, post
export const createPost = (newPost) => axios.post(url, newPost);
// update, patch
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// delete
export const deletePost = (id) => axios.delete(`${url}/${id}`);

// like post
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); 