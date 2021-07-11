import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserCommentList from './UserCommentList';
import db from '../../apis/db'; // import AXIOS connection to database

const UserPosts = () => {
    const dispatch = useDispatch();

    const userEmail = useSelector((state) => state.auth.userInfo.userEmail);

    useEffect(() => {
        (async () => {
            const res = await db.get(`/comment/user/${userEmail}`);
            console.log(res)
            dispatch({ type: 'FETCH_USER_COMMENTS', payload: res.data });
        })();     
    }, [dispatch]);

    const comments = useSelector((state) => Object.values(state.user_comments));
    console.log(comments)
    return(
        <div className="container pt-3 d-flex justify-content-center ">
        <div className="row">
        <h5 className="mt-2">My comments</h5>
        <UserCommentList comments={comments} />      
        </div>
        </div>
    ); 

}

export default UserPosts;
