const product = require("../Models/product")
const productInfo = require("../Models/productInfo")
const formidable = require("formidable");
const fs = require('fs');
exports.getAllProducts = (req,res)=>{
    var skip = req.query.page || "0";
    var perPage = 20*parseInt(skip);
    var hasNext = 20*(parseInt(skip)+1);
     Next = false;
    product.find().skip(hasNext).limit(20).exec((err,has)=>{
        Next = true
    })
    product.find().skip(perPage).limit(20).exec((err, productList)=>{
        dataDetails = {
            data : productList,
            next : Next,
            nextLink :(parseInt(skip)+1),
            previous : (parseInt(skip)-1)
        }
        res.render('list-product',{layout:'index', data : dataDetails})
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
    var skip = req.query.page || "0";
    var perPage = 20*parseInt(skip);
    var hasNext = 20*(parseInt(skip)+1);
    Next = false;
    productInfo.find().skip(hasNext).limit(20).exec((err,has)=>{
        Next = true
    })
    productInfo.find({}).skip(perPage).skip(perPage).limit(10).exec((err,countList)=>{
        dataDetails = {
            data : countList,
            next : Next,
            nextLink :(parseInt(skip)+1),
            previous : (parseInt(skip)-1)
        }
        res.render('product-count',{layout:'index', data : dataDetails})
    })
}