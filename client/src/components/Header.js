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
                <li className="nav-item">
                    <Link className="nav-link" to="/posts">My Posts</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/comments">My Comments</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create">Create</Link>
                </li>
                </>
            );
        }
    }


    return (
        <>
        <div className="jumbotron bg-info p-3">
        <h1 className="display-4">React Blog </h1>
        <p className="lead">with Redux Hooks API, Google Sign-In</p>
        </div>

        <nav className="navbar navbar-light bg-dark justify-content-between p-3">
        <nav className="navbar navbar-expand navbar-dark">
            <Link to="/" className="navbar-brand" replace>
                React Blog
            </Link>
            <div className="collapse navbar-collapse" id="navbarMenu">
                <ul className="navbar-nav">
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
