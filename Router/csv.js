const express = require("express");
var router = express.Router();
const {uploadCsv ,isPrime} = require('../Controller/csv')
router.post("/upload/",uploadCsv)
router.get('/isprime', isPrime)
module.exports = router;