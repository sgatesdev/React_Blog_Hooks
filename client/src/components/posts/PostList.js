import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../helpers/date';
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    const signedIn = useSelector((state) => state.auth.isSignedIn);

    const renderLikeButton = () => {
        return(
            !signedIn ? <button className="btn btn-secondary mx-3">2 Likes</button> : (
                <button className="btn btn-secondary mx-3">Like this post!</button>
            )
        );
    }

    const renderButton = (count) => {
        if(count === 0 ) {
            return 'Add comment';
        }
        else if (count === 1) {
            return 'View Comment (1)';
        }
        else {
            return `View comments (${count})`;
        }
    }

    if(posts) {
        return posts.map(post => {
            return(
                <div className="col-12" key={post.createdAt}>
                <div className="card m-1">
                    <div className="card-body bg-light">
                        <h5 className="card-title">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {post.userActualName} on {` ${formatDate(post.createdAt)}`}
                        </h6>
                    <p className="card-text">
                    {post.content}
                    </p>
                    <Link to={`single/${post._id}`}>
                    <button className="btn btn-secondary">
                    { 
                        renderButton(post.comment_count)
                    } 
                    </button>
                    </Link>
                    {
                        /* renderLikeButton() */
                    }
                    </div>
                </div>
                </div>
            );
        })
    }
    else {
        return <div key={Date.now()}>Loading...</div>;
    }
}

export default PostList;