import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { formatDate } from '../helpers/date';

const DeletePost = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        // delete the post
        props.deletePost(props.match.params.id);
    }

    return props.post === undefined ? null : (
        <div className="ui container">
        <form onSubmit={onSubmit} className="ui form error">
            <h1>Sure you want to delete this post?</h1>
            <div className="ui celled list">
            <div className="item">
                    <div className="content">
                        {props.post.title} 
                        <h5>
                        {` ${formatDate(props.post.createdAt)}`}
                        </h5>
                    </div>
                    <div className="post_content">
                         {props.post.content}
                    </div>
                        
                </div>
            </div>
            <Link to="/posts" className="ui button">Back</Link>
            <button className="ui button" onClick={onSubmit}>Delete</button>
        </form>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(DeletePost);