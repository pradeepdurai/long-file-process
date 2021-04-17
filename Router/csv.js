const express = require("express");
var router = express.Router();
const {uploadCsv ,isPrime,csvToDb} = require('../Controller/csv')
router.post("/upload",uploadCsv)
module.exports = router;