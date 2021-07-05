import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleLogin extends React.Component {
    componentDidMount() {
        // load up google api in background, set up listener, link to state
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ 
                clientId: process.env.REACT_APP_clientId,
                scope: 'email'
             })
             .then(() => {
                // put auth status from google API into component level state
                this.auth = window.gapi.auth2.getAuthInstance();

                // if auth status changes, set auth state to whatever the auth status is
                this.onAuthChange(this.auth.isSignedIn.get());

                // listen for changes to auth status from google api
                this.auth.isSignedIn.listen(this.onAuthChange);
             });
        });
    }

    // this will be called if auth state changes (see above)
    onAuthChange = (isSignedIn) => {
        // if user signed in, do the following
        if(isSignedIn) {
            // create object with all of users info
            const userInfo = {
                token: this.auth.currentUser.get().getAuthResponse().id_token,
                userId: this.auth.currentUser.get().getId(),
                userEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
                userActualName: this.auth.currentUser.get().getBasicProfile().getName()
            }
            
            // trigger signIn action creator/send info to REDUX store
            this.props.signIn(userInfo);
        }
        else {
            this.props.signOut();
        }
    }

    // this helper method displays sign in / sign out Google button
    renderButton = () => {
        if(this.props.isSignedIn === null) {
            return null;
        }
        else if(this.props.isSignedIn) {
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

    render() {
        return <div>{ this.renderButton() }</div>
    }
}

// send auth status from store to this component as prop
const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleLogin);