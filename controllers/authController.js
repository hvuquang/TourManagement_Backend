const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const authController = {
    //Register
    registerUser: async(req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);

            //create new user
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
            });

            //save user
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GENARATE ACCESS TOKEN
    genarateAccessToken: (user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "2h" }
        );
    },
    //GENARATE REFRESH TOKEN
    genarateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "365d" }
        );
    },
    //Login
    loginUser: async(req,res)=>{
        try {
            const user = await User.findOne({userName:req.body.userName});
            if(!user)
                res.status(400).json("Sai tên người người!");
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword)
                res.status(400).json("Sai mật khẩu!");
            if(user && validPassword)
            {
                const accessToken = authController.genarateAccessToken(user);
                const refreshToken = authController.genarateRefreshToken(user);
                const {password, ...others} = user._doc;
                res.status(200).json({...others,accessToken,refreshToken});
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = authController;