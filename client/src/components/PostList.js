import React from 'react';
import { formatDate } from '../helpers/date';
import { Link } from 'react-router-dom';


const PostList = ({posts}) => {
    if(posts) {
        return posts.map(post => {
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
                    <button className="btn btn-secondary">View Comments</button>
                    <button className="btn btn-secondary mx-3">Like</button>
                    </div>
                </div>
                </div>
            );
        })
    }
    else {
        return <div>Loading...</div>;
    }
}

export default PostList;