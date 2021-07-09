import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostList from './PostList';
import db from '../apis/db'; // import AXIOS connection to database

const AllPosts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await db.get('/post/all');

            setTimeout(() => setLoading(false), 500);

            dispatch({ type: 'FETCH_POSTS', payload: res.data });
        })();     
    }, [dispatch]);

    const posts = useSelector((state) => Object.values(state.posts));

    return(
        <div className="container pt-3 d-flex justify-content-center">
        <div className="row">
                {loading ? <h2 key={Date.now()}>Loading posts...</h2> : <PostList posts={posts} />}
        </div>
        </div>
    ); 
}

export default AllPosts;