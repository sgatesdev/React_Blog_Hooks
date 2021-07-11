import React from 'react';
import { formatDate } from '../../helpers/date';
import { Link } from 'react-router-dom';

const UserCommentList = ({comments}) => {
    // if there are posts with emails in the Redux store, display them
    // only show user their own posts
    return comments.map(comment => {
        return(
                <div className="col-12" key={comment._id}>
                <div className="card m-1">
                    <div className="card-body bg-light">
                        <h5 className="card-title">{comment.post.title} {/*`${formatDate(comment.post.createdAt)}`*/}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Commented on: {formatDate(comment.createdAt)}
                        </h6>
                        <p className="card-text">
                        {comment.text}
                        </p>
                        <Link 
                            to={`/comments/edit/${comment._id}`}
                            className="ui button"
                            replace
                        >
                        <button className="btn btn-secondary">
                            Edit
                        </button>
                        </Link>
                        <Link 
                            to={`/comments/delete/${comment._id}`}
                            className="ui button"
                            replace
                        >
                        <button className="btn btn-secondary mx-1">
                            Delete
                        </button>
                        </Link>
                    </div>
                        
                </div>
                </div>);
    });
}

export default UserCommentList;