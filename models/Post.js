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
        type : Array,
        required : true,
    }
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
module.exports = Post ;