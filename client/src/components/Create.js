import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import history from '../history'; // import history object so I can push user around app
import db from '../apis/db'; // import AXIOS connection to database

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // redux hooks
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const writePost = async (postData) => {
        // pull these values from REDUX store
        const { 
            token, 
            userId, 
            userEmail, 
            userActualName 
        } = state.auth.userInfo;
    
        // merge new post title and content with above information, including token
        const sendData = { ...postData, userId, userEmail, userActualName, token };
    
        const res = await db.post('/post/', sendData);
    
        dispatch({ type: 'WRITE_POST', payload: res.data });
    
        history.replace('/');
    }


    const onSubmit = (e) => {
        e.preventDefault();

        let postInfo = { title, content };

        if(title !== '' && content !== '') {
            writePost(postInfo);
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
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <h1>Create a new post</h1>
            <label>Enter Title</label>
            <input 
                name="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Enter Post</label>
            <textarea 
                name="content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
            />
            {renderError()}
            <button className="btn btn-secondary" type="submit">Publish</button>
        </div>
        </form>
        </div>
    );
}

export default Create;