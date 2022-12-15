const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    des : {
        type : String,
        required : true
    },
    imgURLs : {
        type : String,
        required : true,
    },
    like: {
        type: Number,
        default: 0
    },
    owner: {
        type: String,
    }
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
module.exports = Post ;