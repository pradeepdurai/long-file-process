
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const port = 2312;

// Creating Handlebars for front-end Views 
const handlebars = require('express-handlebars')
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir : `${__dirname}/views/layouts`,
    extname : 'hbs'
}))
app.use(express.static('public'))

mongoose.connect('mongodb://mongo:27017/products',{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB is Connected")
})
const csvRoutes = require('./Router/csv');
const listRoutes = require('./Router/list')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/csv",csvRoutes)
app.use("/list", listRoutes)
app.get("/", (req,res)=>{
    res.render('main',{layout:'index'})
})


app.listen(port, () =>{ console.log(`Server Running on port${port}`)})