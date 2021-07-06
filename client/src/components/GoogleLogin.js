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
        dispatch({
            type: 'LOG_OUT'
        });

        history.replace('/');
    }

    const displayError = ({ details }) => {
        setError(details);
    }

    return (
        <div>
        { !isSignedIn ?  
        <GoogleLogin
            clientId={process.env.REACT_APP_clientId}
            buttonText="Login"
            onSuccess={signIn}
            onFailure={displayError}
            cookiePolicy={'single_host_origin'}
        /> : 
        <GoogleLogout
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={signOut}
        />
        }
        { error ? <h1></h1> : null }
        </div>
    );
}

export default GoogleLoginButton;