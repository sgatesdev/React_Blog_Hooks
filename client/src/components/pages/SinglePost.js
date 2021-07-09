import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import db from '../../apis/db'; // import AXIOS connection to database
import { formatDate } from '../../helpers/date';

const SinglePost = (props) => {
    // pull various values from redux store
    const post = useSelector((state) => state.posts[props.match.params.id]);
    const state = useSelector((state) => state);
    const userData = useSelector((state) => state.auth.userInfo);

    // set local state for comment form, api req status (loading), and comments returned from api req
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const res = await db.get(`/comment/all/${props.match.params.id}`);

        setTimeout(() => setLoading(false), 500);

        setComments(res.data);
    }

    const addComment = async () => {
        // merge token, userId with new post data
        const sendData = { ...userData, text, post: post._id };

        await db.post(`/comment/`, sendData);
        
        setText('');
        fetchComments();
    }

    const renderComments = () => {
        // comments.map((comment) => { return (); })
        return comments.map((comment) => {
            return (
            <div className="card-body bg-warning mb-2" key={comment._id}>
                <h6 className="card-title">{comment.userActualName} on {` ${formatDate(comment.createdAt)}`}</h6>
                <p className="card-text">
                {comment.text}
                </p>
            </div>    
        )});
    }

    const renderError = () => {
        if (text === '') {
            return <div className="text-danger m-1">Please enter a comment</div>;
        }

        return null;
    }

    const renderCommentBox = () => {
        return(
            <div className="container">
            <form>
                <div className="form-group my-2">
                <h6>Commenting as { state.auth.userInfo.userActualName }</h6>
                <input 
                    name="comment" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control"
                />
                {renderError()}
                </div>
            </form>
            </div>
        );
    }

    return post === undefined ? <h1>Loading...</h1> : (
        <div className="container" key={props.match.params.id}>
            <div className="card-body bg-light mb-2">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">by {post.userActualName} on {` ${formatDate(post.createdAt)}`}
                </h6>
                <p className="card-text">
                {post.content}
                </p>
            </div>
            { loading ? <h6>Loading comments...</h6> : renderComments() }
            { state.auth?.isSignedIn ? renderCommentBox() : null }
            <Link to="/">
                <button className="btn btn-secondary">Back</button>
            </Link>
            { state.auth?.isSignedIn ? <button className="btn btn-secondary mx-2" onClick={addComment}>Add comment</button> : <h6 className="my-2">Please login to comment</h6> }
        </div>
    );

}

export default SinglePost;