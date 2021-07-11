// This file handles incoming API requests for comments. Some routes are protected and use utils/auth.js as middleware to authenticate the Google token issued at login

const router = require('express').Router();
const _ = require('lodash');

const Comment = require('../models/Comment'); 
const Post = require('../models/Post');

const authUtil = require('../utils/auth');

var cors = require('cors');

// get comments for a specific post
router.get('/all/:id', async (req,res) => {
    let allComments = await Comment.find({ 'post' : req.params.id }).sort({ _id: -1 });

    if(!allComments) {
        return res.json({ message: 'Error finding comments!' });
    }

    return res.json(allComments);
})

// get a specific users comments
router.get('/user/:id', async (req,res) => {
    let allComments = await Comment.find({ 'userEmail' : req.params.id }).populate({
        path: 'post',
        populate: 'Post'
    }).sort({ _id: -1 });

    if(!allComments) {
        return res.json({ message: 'Error finding comments!' });
    }

    return res.json(allComments);
})

// PROTECTED ROUTE: create new comment in database 
// add back in authUtil
router.post('/', authUtil, (req,res) => {
    let comment = new Comment(_.omit(req.body, ['token'])); // remove token from body of post

    comment.save((err,commentRes) => {
        if(err) return res.json(err);

        return res.json(commentRes);
    })
}); 

// PROTECTED ROUTE: update a single post
router.put('/update/:id', authUtil, async (req,res) => {
    let currentComment = await Comment.findById(req.params.id);
    
    if(!currentComment) {
        return res.json({ message: 'Error: comment not found!' });
    }

    // pull title and content out of request
    const { text, userId, email, userActualName } = req.body;

    // update entry
    currentComment.text = text;
    currentComment.userId = userId;
    currentComment.email = email;
    currentComment.userActualName = userActualName;

    // save update in DB
    let updatedComment = await currentComment.save();

    if(!updatedComment) {
        return res.json({ message: 'Error updating record!' });
    }
    else {
        return res.json(updatedComment);
    }
});

// PROTECTED ROUTE: delete a single comment
router.post('/delete/:id', authUtil, async (req,res) => {
    let deleteComment = await Comment.deleteOne({ "_id": req.params.id });

    if(!deleteComment) {
        return res.json({ message: 'Error: comment not found!' });
    }
    else {
        return res.json(deleteComment);
    }
});

module.exports = router;