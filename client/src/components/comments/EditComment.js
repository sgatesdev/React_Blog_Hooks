import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import db from '../../apis/db'; // import AXIOS connection to database
import history from '../../history'; // import history object so I can push user around app
import { formatDate } from '../../helpers/date';

const EditComment = (props) => {
    const dispatch = useDispatch();
    const comment = useSelector((state) => state.user_comments[props.match.params.id]);
    const { token, userId, userActualName } = useSelector((state) => state.auth.userInfo);

    // pull post info from redux, create local state for title and content (for form validation)
    const [text, setText] = useState(comment.text);

    const editComment = async () => {
        // merge token, userId with new post data
        const sendData = { text, token, userId, userActualName };

        const res = await db.put(`/comment/update/${props.match.params.id}`, sendData);
    
        dispatch({ type: 'EDIT_USER_COMMENT', payload: res.data });
    
        /** NAVIGATION REDIRECT */
        history.replace('/comments');
    }

    // when form is submitted, send to action creator to update store and query API to update DB
    const onSubmit = (e) => {
        e.preventDefault();
        
        if(text !== '') {
            editComment();
        }
    }

    const renderError = () => {
        if(text === '') {
            return <div className="text-danger m-1">Please enter a comment</div>;
        }

        return null;
    }

    return(
        <div className="container">
        <h5 className="mt-2">Edit your comment</h5>
        <form onSubmit={onSubmit}>
        <div className="card-body bg-light">
                <h5 className="card-title">{comment.post.title} {/*`${formatDate(comment.post.createdAt)}`*/}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Commented on: {formatDate(comment.createdAt)}
                </h6>
                <p className="card-text">
                <input 
                name="comment" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-control"
                />
                {renderError()}
                </p>
        </div>
            <div className="form-group my-2">
            <Link to="/comments" className="" replace>
                <button className="btn btn-secondary">
                Back    
                </button>
            </Link>
            <button className="btn btn-secondary mx-1" onClick={onSubmit}>Update</button>
            </div>
        </form>
        </div>
    );

}

export default EditComment;