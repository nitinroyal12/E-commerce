const jwt = require('jsonwebtoken')
const { Infomodel } = require('../module/InfoModule')
require('dotenv').config()


// const checkadmin = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const key =  jwt.verify(token, process.env.secret_key)
//         const find = await newusermodel.findOne({
//             email: key.email
//         })
//         if (find.type === "seller") {
//             next()
//         } else {
//             return res.status(403).json({
//                 message: "Unauthorized",
//                 code: 403
//             })
//         }
//     } catch (err) {
//         return res.status(403).json({
//             message: "Unauthorized",
//             code: 403
//         })
//     }
// }

const finddata = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const key = jwt.verify(token, process.env.secret_key);
        const find = await Infomodel.findOne({
            data_h: key.email
        })
        if (find) {
            next()
        }
        else {
            return res.status(403).json({
                message: "Unauthorized",
                code: 403
            })
        }
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized",
            code: 403
        })
    }
}

module.exports = {
    finddata
}