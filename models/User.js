const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlenght:6,
        maxlenght:20,
        unique:true
    },
    email:{
        type: String,
        required: true,
        minlenght: 10,
        maxlenght: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlenght:6
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
);

module.exports = mongoose.model("User",userSchema);