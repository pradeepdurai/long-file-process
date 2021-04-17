const { fork } = require("child_process");
const csv = require('csv-parse');
var mongoose = require('mongoose');
var fastCsv = require('fast-csv');
const csvtojson = require("csvtojson");
var mongoose = require('mongoose');
const formidable = require("formidable");
const fs = require('fs');
const product = require('../Models/product')
exports.uploadCsv = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with images"
            })
        }
        var stream = fs.createReadStream(file.csvFile.path)
        csvtojson()
            .fromFile(file.csvFile.path)
            .then(csvData => {
                console.log(csvData);
            });
            const childProcess = fork('./uploadCsv');
            childProcess.send({ "csvData": result })
            childProcess.on("message", message => {
                console.log(message)
                return res.send(message);
            })
        // var products = [
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc']
        // ];
        // for(var i=0 ;i<products.lemgth;i++){
        //     products[i]['_id'] = new mongoose.Types.ObjectId();
        // }
        // const csvFile = new product(products)
        // csvFile.collection.insertMany(products,(err, product)=>{
        //     if(err){
        //         return res.status(400).json({
        //             message : err
        //         })
        //     }
        // })
        // return;
        var result = [];
        fs.createReadStream(file.csvFile.path)
            .pipe(csv({}))
            .on('data', (data) => {
                result.push(data['_id'])
            })
            .on('end', () => {
                console.log(result)
                const childProcess = fork('./uploadCsv');
                childProcess.send({ "csvData": result })
                childProcess.on("message", message => {
                    console.log(message)
                    return res.send(message);
                })
            })
    });
}
