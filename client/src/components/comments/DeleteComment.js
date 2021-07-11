import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/date';

import db from '../../apis/db'; // import AXIOS connection to database
import history from '../../history'; // import history object so I can push user around app

const DeleteComment = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const comment = state?.user_comments[props.match.params.id];
    const token = state?.auth.userInfo.token;
    const post = state.posts[comment?.post._id];

    const deleteComment = async () => {
        // send token with delete request (using POST since I'm sending JSON)
        await db.post(`/comment/delete/${props.match.params.id}`, { token: token });

        // delete comment from store
        dispatch({ type: 'DELETE_USER_COMMENT', payload: props.match.params.id });
        
        // decrease comment count in store for this post
        dispatch({ type: 'DECREASE_COMMENT', payload: post.comment_count-- });

        /** NAVIGATION REDIRECT */
        history.replace('/comments');
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // delete the post
        deleteComment();
    }

    return comment === undefined ? null : (

      <div className="container" key={comment._id}>
        <h5 className="mt-2">Sure you want to delete this comment forever?</h5>
        <form onSubmit={onSubmit}>
            <div className="card-body bg-light">
                <h5 className="card-title">{comment.post.title} {/*`${formatDate(comment.post.createdAt)}`*/}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Commented on: {formatDate(comment.createdAt)}
                </h6>
                <p className="card-text">
                {comment.text}
                </p>
            </div>
            <Link to="/comments">
                <button className="btn btn-secondary my-2">Back</button>
            </Link>
            <button className="btn btn-secondary mx-2" onClick={onSubmit}>Delete</button>
        </form>
    </div>
    );

}

export default DeleteComment;