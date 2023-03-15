const Product = require('../models/Product');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getProducts = asyncHandler(async(req,res,next) => {
    const products = await Product.find();
    res.status(200).json({success:true, count:products.length, data:products})
})

exports.getProduct = asyncHandler(async(req,res,next) => {
    res.send('get single product works')
})