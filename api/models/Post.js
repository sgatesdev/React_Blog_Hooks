const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
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
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);