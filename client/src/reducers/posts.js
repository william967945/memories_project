import { FETCH_ALL, UPDATE, CREATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => { // (state, action) => {newState}
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };
		case DELETE:
			return { ...state, posts: state.posts.filter((post) => post._id != action.payload) };
		case UPDATE:
			return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.page,
				numberOfPages: action.payload.numberOfPages,
			};
		case CREATE:
			return { ...state, posts: [...state, action.payload] };
		default:
			return state;
	}
};

