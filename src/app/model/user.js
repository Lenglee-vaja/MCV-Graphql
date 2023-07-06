const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["USER", "ADMIN"],
        default: "USER"
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    }
})

var userModel = mongoose.model("user",userSchema );
module.exports = userModel;