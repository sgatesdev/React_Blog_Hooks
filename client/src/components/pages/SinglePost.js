import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import db from '../../apis/db'; // import AXIOS connection to database
import { formatDate } from '../../helpers/date';

const SinglePost = (props) => {
    const post = useSelector((state) => state.posts[props.match.params.id]);
    const state = useSelector((state) => state);

    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    // stores current comments for post
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await db.get(`/comment/all/${props.match.params.id}`);

            setTimeout(() => setLoading(false), 500);

            setComments(res.data);
        })();     
    }, [setComments, props.match.params.id]);

    const renderComments = () => {
        // comments.map((comment) => { return (); })
        return comments.map((comment) => {
            return (
            <div className="card-body bg-warning mb-2">
                <h6 className="card-title">{comment.userActualName} on {` ${formatDate(comment.createdAt)}`}</h6>
                <p className="card-text">
                {comment.text}
                </p>
            </div>    
        )});
    }

    const renderError = () => {
        if (comment === '') {
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                />
                {renderError()}
                </div>
            </form>
            </div>
        );
    }

    return post === undefined ? <h1>Loading...</h1> : (
        <div className="container">
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
            { state.auth?.isSignedIn ? <button className="btn btn-secondary mx-2">Add comment</button> : null }
        </div>
    );

}

export default SinglePost;