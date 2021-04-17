const { fork } = require("child_process");
const csv = require('csv-parse');
var fastCsv = require('fast-csv');
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
        // var products = [
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc'],
        //     ['demo-name', 'demo-sku', 'demo-desc']
        // ];

        // const csvFile = new product(products)
        // csvFile.collection.insertMany(products,(err, product)=>{
        //     if(err){
        //         return res.status(400).json({
        //             message : err
        //         })
        //     }
        // })

        var authorFile = file;
 
        var authors = [];
             
        fastCsv
         .fromString(authorFile.data.toString(), {
             headers: true,
             ignoreEmpty: true
         })
         .on("data", function(data){
             data['_id'] = new mongoose.Types.ObjectId();
              
             authors.push(data);
         })
         .on("end", function(){
             console.log(authors)
            //  Author.create(authors, function(err, documents) {
            //     if (err) throw err;
            //  });
              
            //  res.send(authors.length + ' authors have been successfully uploaded.');
         });
    

        var result = [];
        fs.createReadStream(file.csvFile.path)
            .pipe(csv({}))
            .on('data', (data) => {
                result.push(data)
            })
            .on('end', () => {
                const childProcess = fork('./uploadCsv');
                childProcess.send({ "csvData": result})
                childProcess.on("message", message => {
                    console.log(message)
                    return res.send(message);
                })
            })
    });
}
