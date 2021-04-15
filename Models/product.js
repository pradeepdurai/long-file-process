const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 100,
        trim : true
    },
    sku :{
        type : String,
        required : true,
        unique : true,
        maxlength : 100,
        trim : true
    },
    description : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
}, {timestamps : true});

module.exports = mongoose.model("Product", productSchema);