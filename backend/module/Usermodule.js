const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const newuser = mongoose.Schema({
    name: {
        type: String,
        required: true,
        allowNull: true
    },
    email: {
        type: String,
        required: true,
        allowNull: true
    },
    password: {
        type: String,
        required: true,
        allowNull: true
    },
    phone: {
        type: Number,
        required: true,
        allowNull: true
    },
    type: {
        type: String,
        required: true,
        allowNull: true
    },
    authorization: {
        type: Boolean,
        required: true,
        allowNull: true
    }
},{timestamps:true})

newuser.pre("save", async function(next){
    const user = this;

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password,salt)
        user.password = hash;
        next();
    } catch (err){
        next(err)
    }

})

const newusermodel = mongoose.model("newusermodel", newuser)

module.exports = {
    newusermodel
}