const User =require('../models/User');

const userController = {
    //get all users
    getAllUsers: async(req,res)=>{
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //delete user
    deleteUser: async(req,res)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa thành công");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    tangPost: async(req , res)=>{
        try {
            const id = req.body._id;
            const user = await User.findById(id)
            user.sl_post = user.sl_post + 1;
            user.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    giamPost: async(req , res)=>{
        try {
            const id = req.body._id;
            const user = await User.findById(id)
            user.sl_post = user.sl_post - 1;
            user.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
}

module.exports = userController;