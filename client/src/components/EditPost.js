import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import db from '../apis/db'; // import AXIOS connection to database
import history from '../history'; // import history object so I can push user around app

const EditPost = (props) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts[props.match.params.id]);
    const { token, userId } = useSelector((state) => state.auth.userInfo);

    // pull post info from redux, create local state for title and content (for form validation)
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const editPost = async () => {
        // merge token, userId with new post data
        const sendData = { title, content, token, userId };

        const res = await db.put(`/update/${props.match.params.id}`, sendData);
    
        dispatch({ type: 'EDIT_POST', payload: res.data });
    
        /** NAVIGATION REDIRECT */
        history.replace('/posts');
    }

    // when form is submitted, send to action creator to update store and query API to update DB
    const onSubmit = (e) => {
        e.preventDefault();
        
        if(title !== '' && content !== '') {
            editPost();
        }
    }

    const renderError = () => {
        if(title === '') {
            return <div className="text-danger m-1">Please enter a title</div>;
        }

        if(content === '') {
            return <div className="text-danger m-1">Please enter content</div>;
        }

        return null;
    }

    return(
        <div className="container">
        <form onSubmit={onSubmit} className="ui form error">
            <div className="form-group my-2">
            <h1>Edit Your Post</h1>
            <label>Title</label>
            <input 
                name="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
            />
            </div>
            <div className="form-group my-2">
            <label>Post</label>
            <textarea 
                name="content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
            />
            {renderError()}
            </div>
            <div className="form-group my-2">
            <Link to="/posts" className="ui button" replace>
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

export default EditPost;