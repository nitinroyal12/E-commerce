const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();
const { createnewuser, loginnewuser, seller, deleteuser, forgetpass, otpverify, changepass, find, Block, againchangepass} = require('../controller/UserControll');


routes.post("/newuser",createnewuser)
routes.post("/finduser",loginnewuser)
routes.get("/finduser",find)
routes.post("/deleteuser/:id",deleteuser)
routes.post("/seller",seller)
routes.post("/forget",forgetpass)
routes.post("/verify",otpverify)
routes.post("/change",changepass)
routes.post("/check",Block)
routes.post("/changepass",againchangepass)




module.exports = routes