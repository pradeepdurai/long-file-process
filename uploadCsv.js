// process.on("message", message => {
//     const jsonResponse =  uploadData(message.csvData);
//     process.send(jsonResponse);
//     process.exit();
// })

process.on("message", async(message) => {
    var data = message.csvData;
    await mongoose.connect(URI, OPTS);
    let found = await Test.collection.insertMany(data);
    process.send(found);
    return connection.close();
    // const jsonResponse =  uploadData(message.csvData);
    // process.send(jsonResponse);
    // process.exit();
})


// const product = require('../Models/product')
// function uploadData(data) {
//     var csvFile = new product(data[0])
//     csvFile.save((err, product) => {
//         if (!err) {
//             return {
//                 "record": err
//             }
//         }
//     })
//     return {
//         "record": data[0]
//     }
// }
const mongoose = require('mongoose');
const { Schema, connection } = mongoose;
const URI = 'mongodb://localhost:27017/products';
const OPTS = { useNewUrlParser: true };

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

async function uploadData() {
  await mongoose.connect(URI, OPTS);
  let found = await Test.find({});
  process.send(found);
  return connection.close();
}

// uploadData()