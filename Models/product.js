const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    sku :{
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
}, {timestamps : true});

module.exports = mongoose.model("Product", productSchema);