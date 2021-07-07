import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// using the react-google-login react library to make this WAY easier!
// https://www.npmjs.com/package/react-google-login
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import history from '../history'; 

const GoogleLoginButton = () => {
    // get isSignedIn from global state
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const signIn = ({ profileObj, tokenObj }) => {
        const userInfo = {
            token: tokenObj.id_token,
            userId: profileObj.googleId,
            userEmail: profileObj.email,
            userActualName: profileObj.name
        }

        dispatch({
            type: 'LOG_IN',
            payload: userInfo
        });

        history.replace('/');
    }

    const signOut = () => {
        history.replace('/');
        
        dispatch({
            type: 'LOG_OUT'
        });
    }

    const displayError = ({ details }) => {
        setError(details);
    }

    return (
        <div>
        { !isSignedIn ?  
        <GoogleLogin
            clientId={process.env.REACT_APP_clientId}
            onSuccess={signIn}
            onFailure={displayError}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <button 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled}
                    className="btn btn-success display-flex align-middle m-0"
                >
                    <i className="bi bi-google" />
                    <span className="px-1">Login</span>
                    </button>
            )}
        /> : 
        <GoogleLogout
            clientId={process.env.REACT_APP_clientId}
            buttonText="Logout"
            onLogoutSuccess={signOut}
            className="ui google button"
            render={renderProps => (
                <button 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled}
                    className="btn btn-success display-flex align-middle m-0"
                >
                    <i className="bi bi-google" />
                    <span className="px-1">Logout</span>
                    </button>
            )}
        />
        }
        { error ? <h1>{error}</h1> : null }
        </div>
    );
}

export default GoogleLoginButton;