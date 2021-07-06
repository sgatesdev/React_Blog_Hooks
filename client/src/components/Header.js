/* eslint-disable no-unreachable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GoogleLogin from './GoogleLogin'

const Header = () => {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    // conditionally render Your Posts and Create links depending on auth status (made easy with Redux)
    const renderUserLinks = () => {
        if(isSignedIn) {
            return(
                <>
                <li class="nav-item">
                    <Link className="nav-link" to="/posts">My Posts</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/create">Create</Link>
                </li>
                </>
            );
        }
    }


    return (
        <>
        <div class="jumbotron bg-info p-3">
        <h1 class="display-4">React Blog </h1>
        <p class="lead">with Redux Hooks API, Google Auth</p>
        </div>

        <nav class="navbar navbar-light bg-dark justify-content-between p-3">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <Link to="/" className="navbar-brand" replace>
                React Blog
            </Link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {renderUserLinks()}
                </ul>
            </div>
        </nav>
        <GoogleLogin />
        </nav> 
        </>      
    );
}

export default Header;
