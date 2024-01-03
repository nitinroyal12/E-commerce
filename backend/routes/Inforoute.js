const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();

const {create, find, deletedata, updatedata} = require("../controller/Infocontrol");
const { finddata } = require('../middleware/checkadmin');

routes.post("/create" , create)

routes.get("/find" , find)

routes.delete("/find/:id" , deletedata)

routes.patch("/find/:id" , updatedata)

module.exports = routes