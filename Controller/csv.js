const { fork } = require("child_process");
const csvtojson = require("csvtojson");
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
        var result;
        csvtojson()
            .fromFile(file.csvFile.path)
            .then(csvData => {
                // var csvFile = new product(csvData[0])
                // csvFile.save((err, product) => {
                //     if (!err) {
                //         return {
                //             "record": err
                //         }
                //     }
                // })
                // require('./uploadCsv.js')
                const childProcess = fork('./uploadCsv.js');
                childProcess.send({ "csvData": csvData })
                childProcess.on("message", message => { 
                    return res.json(message);
                })
            });
    });
}
