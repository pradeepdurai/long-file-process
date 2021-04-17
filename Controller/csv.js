const { fork } = require("child_process");
const csv = require('csv-parse');
const formidable = require("formidable");
const fs = require('fs');

exports.uploadCsv = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with images"
            })
        }
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
