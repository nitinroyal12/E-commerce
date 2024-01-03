const mongoose = require('mongoose')


const product = mongoose.Schema({
    headid : {
        type:String,
        required:true,
        allowNull:true
    },
    product_name : {
        type:String,
        required:true,
        allowNull:true
    },
    product_company : {
        type:String,
        required:true,
        allowNull:true
    },
    product_price : {
        type:Number,
        required:true,
        allowNull:true
    },
    product_discount : {
        type:Number,
        required:true,
        allowNull:true
    },
    Product_actualprice : {
        type:Number,
        required:true,
        allowNull:true
    },
    product_description : {
        type:String,
        required:true,
        allowNull:true
    },
     product_img : {
        type:String
        
    }
},{timestamps:true})

const productmodel = mongoose.model("productmodel",product)

module.exports = {productmodel}