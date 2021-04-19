const express = require("express");
var router = express.Router();
const {getAllProducts, editProduct,updateProduct,count} = require('../Controller/list')

router.get("/products",getAllProducts)
router.get("/edit/:id",editProduct)
router.post("/update",updateProduct)
router.get("/count",count)

module.exports = router;