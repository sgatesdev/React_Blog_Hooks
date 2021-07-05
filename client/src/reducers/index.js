import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducers from './postReducers';

// define reducers for redux to use
export default combineReducers ({
    auth: authReducer,
    posts: postReducers
});