const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: String,
    productName: String,
    price: Number,
    colors: Object,
    imgPath: String,
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    }
})


var productModel = mongoose.model("product",productSchema );
module.exports = productModel;