import { combineReducers } from "redux";

import posts from './posts';

export default combineReducers({
    posts, // equals >>> posts: posts when the name and the value are same
});