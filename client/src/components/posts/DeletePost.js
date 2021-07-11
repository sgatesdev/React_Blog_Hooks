import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/date';

import db from '../../apis/db'; // import AXIOS connection to database
import history from '../../history'; // import history object so I can push user around app

const DeletePost = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.userInfo.token);
    const post = useSelector((state) => state.posts[props.match.params.id]);

    const deletePost = async () => {
        // send token with delete request (using POST since I'm sending JSON)
        await db.post(`/post/delete/${props.match.params.id}`, { token: token });
    
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
        <div className="container">
        <form onSubmit={onSubmit}>
            <h1>Sure you want to delete this post?</h1>
            <div className="card-body bg-light mb-2">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">by {post.userActualName} on {` ${formatDate(post.createdAt)}`}
                </h6>
                <p className="card-text">
                {post.content}
                </p>
            </div>
            <Link to="/posts">
                <button className="btn btn-secondary">Back</button>
            </Link>
            <button className="btn btn-secondary mx-1" onClick={onSubmit}>Delete</button>
        </form>
        </div>
    );

}

export default DeletePost;