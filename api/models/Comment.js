const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = require('./Post');

const CommentSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    userId: {
        type: Number, 
        require: true
    },
    userEmail: {
        type: String,
        require: false
    },
    userActualName: {
        type: String,
        require: false
    }, 
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);