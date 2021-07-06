import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostList from './PostList';
import db from '../apis/db'; // import AXIOS connection to database

const AllPosts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await db.get('/all');

            dispatch({ type: 'FETCH_POSTS', payload: res.data });
        })();     
    }, [dispatch]);

    const posts = useSelector((state) => Object.values(state.posts));

    return(
        <div class="container pt-3 d-flex justify-content-center ">
        <div class="row">
                {posts ? <PostList posts={posts} /> : <h2>Loading</h2> }
        </div>
        </div>
    ); 
}

export default AllPosts;