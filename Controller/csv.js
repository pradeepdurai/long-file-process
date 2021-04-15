const {fork} = require("child_process");

exports.uploadCsv = (req , res) =>{
    const childProcess = fork('./uploadCsv');
    childProcess.send({"number": parseInt(req.query.number)})
    childProcess.on("message", message => res.send(message))
}

exports.isPrime = (req, res)=>{
    //29355126551
    const childProcess = fork('./isprime');
    childProcess.send({"number": parseInt(req.query.number)})
    childProcess.on("message", message => res.send(message))
}