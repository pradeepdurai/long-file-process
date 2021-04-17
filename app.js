
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const port = 2312;

mongoose.connect('mongodb://localhost/products',{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB is Connected")
})
const csvRoutes = require('./Router/csv');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/csv",csvRoutes)

app.listen(port, () =>{ console.log(`Server Running on port${port}`)})