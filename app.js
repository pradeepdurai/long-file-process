
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const port = 2312;
const csvRoutes = require('./Router/csv');

mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB is Connected")
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/csv",csvRoutes)

app.get('/',(req,res)=>{
    res.send("HI");
})
app.listen(port, () =>{ console.log(`Server Running on port${port}`)})