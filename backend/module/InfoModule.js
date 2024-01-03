const mongoose = require('mongoose');


const Information = mongoose.Schema({
    data_h:{
        type:String,
        required:true,
        allowNull:true
    },
    email:{
        type:String,
        required:true,
        allowNull:true
    },
    f_name:{
        type:String,
        required:true,
        allowNull:true
    },
    l_name:{
        type:String,
        required:true,
        allowNull:true
    },
    dob:{
        type:String,
        required:true,
        allowNull:true
    },
    phone:{
        type:Number,
        required:true,
        allowNull:true
    },
    address:{
        type:String,
        required:true,
        allowNull:true
    },
    city:{
        type:String,
        required:true,
        allowNull:true
    },
     state:{
        type:String,
        required:true,
        allowNull:true
    },
     postal_code:{
        type:Number,
        required:true,
        allowNull:true
    }
},{timestamps:true})


const Infomodel = mongoose.model("Infomodel",Information)

module.exports = {
    Infomodel
}