import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducers from './postReducers';
import commentReducer from './commentReducer';

// define reducers for redux to use
export default combineReducers ({
    auth: authReducer,
    posts: postReducers,
    user_comments: commentReducer
});