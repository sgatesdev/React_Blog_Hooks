// Action creators for the REDUX store
import { useDispatch } from 'react-redux';

import db from '../apis/db'; // import AXIOS connection to database
import history from '../history'; // import history object so I can push user around app

// get all posts
export const fetchPosts = () => async () => {
    const res = await db.get('/all');
    const dispatch = useDispatch();

    dispatch({ type: 'FETCH_POSTS', payload: res.data });
}

// get a single post
export const fetchPost = (postId) => async (dispatch) => {
    const res = await db.get(`/one/${postId}`);

    dispatch({ type: 'FETCH_POST', payload: res.data });
}

export const signIn = (userInfo) => {
    history.replace('/');

    return {
        type: 'LOG_IN',
        payload: userInfo
    }
}

export const signOut = () => {
    history.replace('/');

    return {
        type: 'LOG_OUT'
    }
}

export const writePost = (postData) => async (dispatch, getState) => {
    // pull these values from REDUX store
    const { token, userId, userEmail, userActualName } = getState().auth.userInfo;

    // merge new post title and content with above information, including token
    const sendData = { ...postData, userId, userEmail, userActualName, token };

    await db.post('/', sendData);

    dispatch({ type: 'WRITE_POST' });

    history.replace('/');
}

export const editPost = (postId, newPost) => async (dispatch, getState) => {
    // get token and userId from REDUX store
    const { token, userId } = getState().auth.userInfo;

    // merge token, userId with new post data
    const sendData = { ...newPost, token, userId };

    const res = await db.put(`/update/${postId}`, sendData);

    dispatch({ type: 'EDIT_POST', payload: res.data });

    /** NAVIGATION REDIRECT */
    history.replace('/posts');
}

export const deletePost = (postId) => async (dispatch, getState) => {
    // get token from REDUX store
    const { token } = getState().auth.userInfo;

    // send token with delete request (using POST since I'm sending JSON)
    await db.post(`/delete/${postId}`, { token: token });

    dispatch({ type: 'DELETE_POST', payload: postId });

    /** NAVIGATION REDIRECT */
    history.replace('/posts');
}