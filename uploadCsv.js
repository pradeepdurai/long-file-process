
process.on("message", async (message) => {
    var data = message.csvData;
    await mongoose.connect(URI, OPTS);
    let IsProductExist = await Test.find({}); // Check Record Exist
    let NewData = [];
    if (IsProductExist.length > 0) { // Record Found Updating The old Records
        data.map(async (e, i) => {
            let temp = IsProductExist.find(element => element.sku === e.sku)
            if (temp) {
                // console.log(`updateOne({sku : "${temp.sku}"},{$set : {name : "${e.name}",description : "${e.description}"} })`)
                await Test.updateOne({ sku: temp.sku }, { $set: { name: e.name, description: e.description } })
            } else {
                NewData.push(e)
            }
            temp = '';
        }) // Bulk Inser the Records
        if (NewData.length > 0) {
            await Test.collection.insertMany(NewData);

        }
    } else { //Bulk Insert
        let found = await Test.collection.insertMany(data);
    }

    // Getting The number of products with same Name
    let NoOfAcc = await Test.aggregate([
        { $group: { _id: "$name", count: { $sum: 1 } } }
    ])

    let IsRecordExist = await ProductCount.find({}) // Check product Count Exist
        if(IsRecordExist.length > 0){
            await mongoose.connection.db.dropCollection('productinfos')
        }
        let InsertCount = await ProductCount.collection.insertMany(NoOfAcc) // Bulk Insert Of Records
        process.send(NoOfAcc); // Complete the Child Process
        return connection.close();
})

//MongoDB Connection
const mongoose = require('mongoose');
const { Schema, connection } = mongoose;
const URI = 'mongodb://mongo:27017/products';
const OPTS = {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true
};

// Database Schema For Products
const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sku: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
});

const Test = mongoose.model('Product', schema);

// Database Schema for Product counts 
const productInfo = new Schema({
    _id: {
        type: String,
    },
    count: {
        type: Number,
    }
})

const ProductCount = mongoose.model('productInfo', productInfo);