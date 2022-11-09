const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
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
                res.status(400).json("Sai tên người dùng!");
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
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken" , refreshToken , {
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite: "strict",
                })
                const {password, ...others} = user._doc;
                res.status(200).json({...others,accessToken});
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    requestRefreshToken : async(req,res)=>{
        // Lấy refreshToken từ người dùng
        const refreshToken = req.cookies.refreshToken;
        //Kiểm tra có refreshToken không 
        if(!refreshToken)
            return res.status(401).json("You're not authenticated");
        //Kiểm tra xem refreshToken có trong refreshTokens của mình hay không?
        if(!refreshTokens.includes(refreshToken))
            return res.status(403).json("Refresh token is not valid");
        //Xác nhận refreshToken đúng không
        jwt.verify(refreshToken , process.env.JWT_REFRESH_KEY , (err,user)=>{
            if(err)
                console.log(err);
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = authController.genarateAccessToken(user);
            const newRefreshToken = authController.genarateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken : newAccessToken});
        })
    },
    Logout : async(req , res) =>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken 
        );
        res.status(200).json("Logged out !");
    }
}

module.exports = authController;