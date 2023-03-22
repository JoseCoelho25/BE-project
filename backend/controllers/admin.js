const Product = require('../models/Product');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.postAddProduct = asyncHandler(async(req,res,next) => {
    res.send('Posted a product!')
})

exports.getAddProduct = asyncHandler(async(req,res,next) => {
    res.send('Got posted product!')
})

exports.getProducts = asyncHandler(async(req,res,next) => {
    const products = await Product.find();

    if (!products) {
      return next(new ErrorResponse('Products not found!', 404));
    }
    res.status(200).json({success:true, count:products.length, data:products})
})

exports.getAdminProduct = asyncHandler(async(req,res,next) => {
    res.send('Gottem')
})