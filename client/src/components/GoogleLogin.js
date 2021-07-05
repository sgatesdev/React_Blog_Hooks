import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import history from '../history'; // import history object so I can push user around app

const GoogleLogin = () => {
    // define isSignedIn
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const dispatch = useDispatch();

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        // load up google api in background, set up listener, link to state
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ 
                clientId: process.env.REACT_APP_clientId,
                scope: 'email'
             })
             .then(() => {
                // put auth status from google API into component level state
                setAuth(window.gapi.auth2.getAuthInstance());

                console.log(window.gapi.auth2.getAuthInstance())

                // if auth status changes, set auth state to whatever the auth status is
                onAuthChange(auth.isSignedIn.get());

                // listen for changes to auth status from google api
                auth.isSignedIn.listen(onAuthChange);
             });
        });
    }, []);

    // this will be called if auth state changes (see above)
    const onAuthChange = (isSignedIn) => {
        // if user signed in, do the following
        if(isSignedIn) {
            // create object with all of users info
            const userInfo = {
                token: auth.currentUser.get().getAuthResponse().id_token,
                userId: auth.currentUser.get().getId(),
                userEmail: auth.currentUser.get().getBasicProfile().getEmail(),
                userActualName: auth.currentUser.get().getBasicProfile().getName()
            }
            
            // trigger signIn action creator/send info to REDUX store
            signIn(userInfo);
        }
        else {
            signOut();
        }
    }

    const signIn = (userInfo) => {
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

    // this helper method displays sign in / sign out Google button
    const renderButton = () => {
        if(isSignedIn === null) {
            return null;
        }
        else if(isSignedIn) {
            return(
                <button className="ui google button" onClick={this.auth.signOut}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return(
                <button className="ui google button" onClick={this.auth.signIn}>
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }

    return <div>{ renderButton() }</div>
}

export default GoogleLogin;