import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleLogin from './GoogleLogin'

const Header = ({isSignedIn}) => {
    // conditionally render Your Posts and Create links depending on auth status (made easy with Redux)
    const renderUserLinks = () => {
        if(isSignedIn) {
            return(
                <>
                <Link to="/posts" className="item" replace>
                    Your Posts
                </Link>
                <Link to="/create" className="item" replace>
                    Create
                </Link>
                </>
            );
        }
    }

    return(
        <>
        <div className="ui inverted vertical masthead center aligned segment">
        <a href="https://samgates.io/">SamGates.io</a> - React Blog w/ Google Auth!</div>
        <div className="ui secondary pointing menu">
            <Link to="/" className="item" replace>
                Home
            </Link>
            {renderUserLinks()}
        <div className="right menu">
            <GoogleLogin />
        </div>
        </div>
        </>
    );
}

// send auth status from REDUX to this component
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {})(Header);