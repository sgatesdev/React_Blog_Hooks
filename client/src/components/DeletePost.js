import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/date';

import db from '../apis/db'; // import AXIOS connection to database
import history from '../history'; // import history object so I can push user around app

const DeletePost = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.userInfo.token);
    const post = useSelector((state) => state.posts[props.match.params.id]);

    const deletePost = async () => {
        // send token with delete request (using POST since I'm sending JSON)
        await db.post(`/delete/${props.match.params.id}`, { token: token });
    
        dispatch({ type: 'DELETE_POST', payload: props.match.params.id });
    
        /** NAVIGATION REDIRECT */
        history.replace('/posts');
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // delete the post
        deletePost();
    }

    return post === undefined ? null : (
        <div className="ui container">
        <form onSubmit={onSubmit} className="ui form error">
            <h1>Sure you want to delete this post?</h1>
            <div className="ui celled list">
            <div className="item">
                    <div className="content">
                        {post.title} 
                        <h5>
                        {` ${formatDate(post.createdAt)}`}
                        </h5>
                    </div>
                    <div className="post_content">
                         {post.content}
                    </div>
                        
                </div>
            </div>
            <Link to="/posts" className="ui button">Back</Link>
            <button className="ui button" onClick={onSubmit}>Delete</button>
        </form>
        </div>
    );

}

export default DeletePost;