const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userroutes = require('./routes/userRoutes');
const productroutes = require('./routes/Productroutes');
const inforoute = require('./routes/Inforoute')

require('dotenv').config()


const app = express();

app.use(bodyParser.json({extended:true , limit : "5mb"}));
app.use(bodyParser.urlencoded({extended:true , limit:"5mb"}))
app.use(cors())
app.use(express.json({extended:true , limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'))



app.use("/user",userroutes)
app.use("/info",inforoute)
app.use("/product",productroutes)




mongoose.connect(process.env.DB,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`server is up and running ${process.env.port}`);
        console.log(`Database is connected`);
    })
}).catch((err)=>{
    console.log(err.message);
})