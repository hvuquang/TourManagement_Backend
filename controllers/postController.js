const path = require("path");
const postModel = require("../models/Post");

const postController = {
    addPost : async(req , res)=>{
        const post = new postModel({
            title: req.body.title,
            des: req.body.des,
            owner: req.body.owner
        })
        if(req.files){
            let path = '';
            req.files.forEach((function (files, index, arr) {
                path = path + files.path + ','
            }));
            path=path.substring(0 , path.lastIndexOf(','));
            post.imgURLs = path;
        }
        try {
            await post.save();
            res.send(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    readPost: async(req,res) => {
        try{
            const posts= await postModel.find({});
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    likePost: async(req , res)=>{
        try {
            const id = req.body._id;
            const post = await postModel.findById(id);
            post.like = post.like + 1;
            post.save();
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deletePost: async (req, res) => {
        try {
          const post = await postModel.findByIdAndDelete(req.params.id, req.body);
          if (!post) res.status(404).send("Không tìm thấy dữ liệu");
          res.status(200).send();
        } catch (error) {
          res.status(500).send(error);
        }
      },
  updatePost: async (req, res) => {
    try {
        const post = await postModel.findByIdAndUpdate(req.params.id, req.body);
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
    }
};

module.exports = postController;
