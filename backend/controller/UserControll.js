const { newusermodel } = require('../module/Usermodule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Create, sendopt } = require("../Email/Email")
require("dotenv").config()

var val = Math.floor(1000 + Math.random() * 9000);


const createnewuser = async (req, res) => {
    const user = req.body;
    const newuser = new newusermodel(user);


    try {
        const email = await newusermodel.findOne({
            email: user.email
        })

        if (email) {
            res.status(404).json({
                message: "You Are Already a User"
            })
        } else {
            await newuser.save()
            return res.status(201).json({
                message: "user created successful",
                result: newuser,
                email: Create(newuser)
            })

        }


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}

const loginnewuser = async (req, res) => {
    const { username, userpass } = req.body;


    try {
        const user = await newusermodel.findOne({
            email: username
        });



        if (!user) {
            return res.status(404).json({
                message: "User Not Exist"
            })
        }

        const checkpass = user.password

        const result = bcrypt.compareSync(userpass, checkpass)
        // const result = user.password === userpass
        if (!result) {
            return res.status(404).json({
                message: "Incorrect Password"
            })
        }

        if (user.authorization === false){
            return res.status(404).json({
                message:"You Are Block by Admin"
            })
        }
        const token = jwt.sign({ email: user.email }, process.env.secret_key, { expiresIn: "1h" })
        return res.status(200).json({
            message: "login successful",
            token: token,
            result: user
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const seller = async (req, res) => {
    const { phone, password } = req.body
    try {
        const find = await newusermodel.findOne({ phone })
        if (!find) {
            return res.status(404).json({
                message: "Phone No. is not registered"
            })
        }

        const result = bcrypt.compareSync(password, find.password)

        if (!result) {
            return res.status(404).json({
                message: "Password Not Matched"
            })
        }
        else {
            find.type = "seller"
            find.password = password
        }
        const update = await find.save()
        return res.status(201).json({
            message: "Register Seller",
            result: update
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteuser = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const find = await newusermodel.findById(id)
        const result = bcrypt.compareSync(password, find.password)
        if (!result) {
            return res.status(404).json({
                message: "Incorrect Password"
            })
        } else {
            await newusermodel.findByIdAndDelete(id)
            return res.status(200).json({
                message: "User Deleted Successful"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const forgetpass = async (req, res) => {
    const {email} = req.body;
    try{
        const find = await newusermodel.findOne({email:email})
        if(!find){
            return res.status(404).json({
                message:"Invalid E-mail"
            })
        }else{
            return res.status(200).json({
                message:"OTP send Your Mail",
                result:false,
                email:find.email,
                send:sendopt(val,find.email)
            })
        }

    } catch (err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const otpverify = async (req,res) => {
    const {otp} = req.body;

    try{
        if(val != otp){
            return res.status(404).json({
                message:"Invalid OTP"
            })
        }else{
            return res.status(200).json({
                message:"Create new Password"
            })
        }

    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const changepass = async (req,res) =>{
    const {password,email} = req.body
    try{
        const find = await newusermodel.findOne({ email })
        
        find.password = password

        const update = await find.save()
        return res.status(201).json({
            message: "New Password Created",
            result: update
        })
        

    } catch (err){
        return res.status(500).json({
            message:err.message
        })
    }
}
const find = async (req,res) => {
     
    try{
        
        const finddata = await newusermodel.find({})
        return res.status(200).json({
            message:"data finded",
            result:finddata
            
        
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }
}

const Block = async(req,res) => {
    const {senddata ,mail} = req.body;
    
    try{
        const find = await newusermodel.updateOne(
            {email:mail},
            {$set: {authorization:senddata}}
            )
    
        return res.status(200).json({
            message:"Seller Block Successfull"
        })
    } catch (err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const againchangepass = async (req,res) =>{
    const {email,old,confirm} = req.body
  try{
    const find = await newusermodel.findOne({email})
    const result = bcrypt.compareSync(old, find.password)
    if(!result){
        return res.status(404).json({
            message:"Old password is not Matched"
        })
    }
    find.password = confirm
    await find.save()
    return res.status(201).json({
        message:"Password Changed successful"
    })
  } catch(err){
    return res.status(500).json({
        message:err.message
    })
  } 
} 
module.exports = {
    createnewuser,
    loginnewuser,
    seller,
    deleteuser,
    forgetpass,
    otpverify,
    changepass,
    find,
    Block,
    againchangepass
}