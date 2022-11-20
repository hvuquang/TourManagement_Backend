const postModel = require('../models/Post');

const postController = {
    addPost : async(req , res)=>{
        const post = new postModel({
            title: req.body.title,
            des: req.body.des,
            imgURLs: req.body.imgURLs
        })
        try {
            await post.save();
            res.send(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = postController;