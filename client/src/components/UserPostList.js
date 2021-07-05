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
                    <div className="item" key={post.createdAt}>
                        <div className="right floated content">
                            <Link 
                                to={`/posts/edit/${post._id}`}
                                className="ui button"
                                replace
                            >
                            Edit
                            </Link>
                            <Link 
                                to={`/posts/delete/${post._id}`}
                                className="ui button"
                                replace
                            >
                            Delete
                            </Link>
                        </div>
                        <div className="content">
                            {post.title} 
                            <h5>by {post.userActualName} on 
                            {` ${formatDate(post.createdAt)}`}
                            </h5>
                        </div>
                        <div className="post_content">
                        {post.content}
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