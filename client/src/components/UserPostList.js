import React from 'react';
import { formatDate } from '../helpers/date';
import { Link } from 'react-router-dom';

const UserPostList = ({posts,userEmail}) => {
    // if there are posts with emails in the Redux store, display them
    // only show user their own posts
    if(posts) {
        return posts.map(post => {
            if(post.userEmail === userEmail) {
                return(
                    <div class="col-12">
                    <div className="card m-1" key={post.createdAt}>
                        <div className="card-body bg-light">
                            <h5 class="card-title">{post.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">by {post.userActualName} on {` ${formatDate(post.createdAt)}`}
                            </h6>
                            <p class="card-text">
                            {post.content}
                            </p>

                            <Link 
                                to={`/posts/edit/${post._id}`}
                                className="ui button"
                                replace
                            >
                            <button className="btn btn-secondary">
                                Edit
                            </button>
                            </Link>
                            <Link 
                                to={`/posts/delete/${post._id}`}
                                className="ui button"
                                replace
                            >
                            <button className="btn btn-secondary mx-1">
                                Delete
                            </button>
                            </Link>
                        </div>
                           
                    </div>
                    </div>
                );
            }
            else {
                return null;
            }
        })
    }
    else {
        return <div></div>;
    }
}

export default UserPostList;