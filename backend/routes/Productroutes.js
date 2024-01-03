const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })
const uploads = require('../middleware/Multer')

const { createproduct, getallproduct, deleteproduct, updateproduct } = require('../controller/ProductControl');



routes.post("/createproduct",uploads.single('product_img'),createproduct)
routes.get("/createproduct",getallproduct)
routes.delete("/createproduct/:id",deleteproduct)
routes.patch("/createproduct/:id",updateproduct)

module.exports = routes