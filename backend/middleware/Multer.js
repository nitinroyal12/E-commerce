const multer  = require('multer')
const path = require('path')


let storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './uploads');
    },

    filename: function (req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

// let uploads = multer({
//     storage:storage,
//     fileFilter:function(req,file,cb){
//         if(file.mimetype === "image/png" || file.mimetype === "image/jpg" ){
//             cb(null,true)
//         }else {
//             console.log("only jpg and png file supported");
//             cb(null,false)
//         }
//     },
//     limits:{
//         fileSize:1024 * 1024 * 5,
//     }
// })
const uploads = multer({storage})

module.exports = uploads