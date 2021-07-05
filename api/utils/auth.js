const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
require('dotenv').config();

/**
 * Currently using Google's API Client Library as middleware to authenticate tokens on protected API routes
 * 
 * In a true production app, I would verify the Google token on a POST route, and then my server would issue its own tokens to authenticate requests. I am skipping those steps since I do not have a user database for this app (yet) 
 */

const withAuth = (req, res, next) => {
    console.log('Authenticating user...');

    if(!req.body.token) {
        return res.json({message: "DENIED! MUST BE AUTHENTICATED!"});
    }

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID  
        });
    
        const payload = ticket.getPayload();
        console.log('User authenticated!');
        return next();
    }

    try {
        verify();
    }
    catch {
        return res.json({message: "COULD NOT AUTHENTICATE!"});
    }

};
      
module.exports = withAuth;