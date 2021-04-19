const mongoose = require('mongoose');
const { Schema, connection } = mongoose;
const productInfo = new Schema({
    _id: {
        type: String,
    },
    count: {
        type: Number,
    }
})

module.exports = mongoose.model("productInfo", productInfo);
// const ProductCount = mongoose.model('productInfo', productInfo);