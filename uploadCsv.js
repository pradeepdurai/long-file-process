
process.on("message", async(message) => {
    var data = message.csvData;
    await mongoose.connect(URI, OPTS);
    let found = await Test.collection.insertMany(data);
    process.send(found);
    return connection.close();
})

const mongoose = require('mongoose');
const { Schema, connection } = mongoose;
const URI = 'mongodb://localhost:27017/products';
const OPTS = { useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex:true };

const schema = new Schema({
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
});

const Test = mongoose.model('Product', schema);