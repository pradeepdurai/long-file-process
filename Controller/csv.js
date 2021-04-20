const { fork } = require("child_process");
const csvtojson = require("csvtojson");
const formidable = require("formidable");
const fs = require('fs');
const product = require('../Models/product')
exports.uploadCsv = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //Parsing the CSV files 
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with images"
            })
        }
        var result;
        // Changing the csv to MongoDB Document Formet
        csvtojson()
            .fromFile(file.csvFile.path)
            .then(csvData => {
                // Creating The Child Process For Insert or Updating the CSV Data
                const childProcess = fork('./uploadCsv.js');
                childProcess.send({ "csvData": csvData })
                childProcess.on("message", message => { 
                    return  res.render('main',{layout:'index'})
                })
            });
    });
}
