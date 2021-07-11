// This file handles incoming API requests for blog posts. Some routes are protected and use utils/auth.js as middleware to authenticate the Google token issued at login

const router = require('express').Router();
const _ = require('lodash');

const Post = require('../models/Post'); 
const Comment = require('../models/Comment');

const authUtil = require('../utils/auth');

// get all posts
router.get('/all', async (req,res) => {
    let allPosts = await Post.find({}, '-userId').sort({ _id: -1 }).limit(20);
    
    // my solution for counting comments
    for(let i = 0; i < allPosts.length; i++) {
        let count = await Comment.countDocuments({ post: allPosts[i]._id });
        allPosts[i] = { ...allPosts[i]['_doc'], ['comment_count']: count };
    }

    if(!allPosts) {
        return res.json({ message: 'Error finding posts!' });
    }

    return res.json(allPosts);
})

// get a specific users posts
router.get('/all/:id', async (req,res) => {
    let allPosts = await Post.find({ 'userId' : req.params.id });

    if(!allPosts) {
        return res.json({ message: 'Error finding posts!' });
    }

    return res.json(allPosts);
})

// get single post with post id
router.get('/one/:id', async (req,res) => {
    let onePost = await Post.findOne({_id: req.params.id});

    if(!onePost) {
        return res.json({ message: 'Error finding post with that ID!' });
    }

    return res.json(onePost);
})

// PROTECTED ROUTE: create new post in database 
router.post('/', authUtil, (req,res) => {
    let post = new Post(_.omit(req.body, ['token'])); // remove token from body of post

    post.save((err,postRes) => {
        if(err) return res.json(err);


        console.log(postRes)
        return res.json(postRes);
    })
}); 

// PROTECTED ROUTE: update a single post
router.put('/update/:id', authUtil, async (req,res) => {
    let currentPost = await Post.findById(req.params.id);
    console.log(currentPost)
    if(!currentPost) {
        return res.json({ message: 'Error: post not found!' });
    }

    // pull title and content out of request
    const {title,content,userId} = req.body;

    // update entry
    currentPost.title = title;
    currentPost.content = content;
    currentPost.userId = userId;

    // save update in DB
    let updatedPost = await currentPost.save();

    if(!updatedPost) {
        return res.json({ message: 'Error updating record!' });
    }
    else {
        return res.json(updatedPost);
    }
});

// PROTECTED ROUTE: delete a single post
router.post('/delete/:id', authUtil, async (req,res) => {
    let deletePost = await Post.deleteOne({ "_id": req.params.id });

    if(!deletePost) {
        return res.json({ message: 'Error: post not found!' });
    }
    else {
        return res.json(deletePost);
    }
});

module.exports = router;