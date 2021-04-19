const product = require("../Models/product")
const productInfo = require("../Models/productInfo")
const formidable = require("formidable");
const fs = require('fs');
exports.getAllProducts = (req,res)=>{
    product.find().limit(20).exec((err, productList)=>{
        res.render('list-product',{layout:'index', data : productList})
    })
    
}

exports.editProduct = (req, res, next)=>{
    product.findOne({sku : req.params.id},(err,product)=>{
        res.render('add-edit-product',{layout:'index', data : product})
    })
}

exports.updateProduct = (req,res) =>{
    res.send(req.body)
}

exports.count = (req,res) =>{
    productInfo.find({}).limit(10).exec((err,countList)=>{
        res.render('product-count',{layout:'index', data : countList})
    })
}