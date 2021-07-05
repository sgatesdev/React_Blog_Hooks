import React from 'react';
import { formatDate } from '../helpers/date';

const PostList = ({posts}) => {
    if(posts) {
        return posts.map(post => {
            return(
                <div className="item" key={post.createdAt}>
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
        })
    }
    else {
        return <div>Loading...</div>;
    }
}

export default PostList;