import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserPostList from './UserPostList';
import db from '../apis/db'; // import AXIOS connection to database

const UserPosts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await db.get('/all');

            dispatch({ type: 'FETCH_POSTS', payload: res.data });
        })();     
    }, [dispatch]);

    const posts = useSelector((state) => Object.values(state.posts));
    const userEmail = useSelector((state) => state.auth.userInfo.userEmail);

    return(
        <div className="ui container">
            <h1>Your posts</h1>
            <div className="ui celled list">
                <UserPostList posts={posts} userEmail={userEmail} />
            </div>
        </div>
    ); 

}

export default UserPosts;