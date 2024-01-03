const { Infomodel } = require('../module/InfoModule')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const create = async (req, res) => {
    const info = req.body;
    const newinfo = new Infomodel(info);
    try {
        await newinfo.save();
        res.status(201).json({
            message: "Information Submited",
            result: newinfo
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const find = async (req, res) => {
    try {
        
        
        const find = await Infomodel.find({
        })
        if (find) {
            return res.status(200).json({
                message: "data find ",
                result: find
            })
        } else {
            return res.status(403).json({
                message: "Unauthorized",
                code: 403
            })
        }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deletedata = async (req,res) => {
    const {id} = req.params
    try{
        const find =await Infomodel.findOne({
            _id : id
        })
        await Infomodel.findByIdAndDelete(id)
        return res.status(200).json({
            message:"Data Deleted Successful"
        })


    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const updatedata = async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    try{
        const find = await Infomodel.findOne({
            _id: id
        })
        const update = await Infomodel.findByIdAndUpdate(id,data);
        return res.status(200).json({
            message:"Edit Detail Successful",
            result: update
        })
    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
module.exports = {
    create,
    find,
    deletedata,
    updatedata
}