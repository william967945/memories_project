import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; 
    }

    return req;
});

// read, get, fetch
export const fetchPosts = () => API.get('/posts'); 
// create, post
export const createPost = (newPost) => API.post('/posts', newPost);
// update, patch
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// delete
export const deletePost = (id) => API.delete(`/posts/${id}`);
// like post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); 

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);    


