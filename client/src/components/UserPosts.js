import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserPostList from './UserPostList';
import db from '../apis/db'; // import AXIOS connection to database

const UserPosts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await db.get('/post/all');

            dispatch({ type: 'FETCH_POSTS', payload: res.data });
        })();     
    }, [dispatch]);

    const posts = useSelector((state) => Object.values(state.posts));
    const userEmail = useSelector((state) => state.auth.userInfo.userEmail);

    return(
        <div className="container pt-3 d-flex justify-content-center ">
        <div className="row">
                <UserPostList posts={posts} userEmail={userEmail} />
        </div>
        </div>
    ); 

}

export default UserPosts;