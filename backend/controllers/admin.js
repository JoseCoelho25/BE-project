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
    const product = await Product.findById(req.params.productId)

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
    }

    res.status(201).json({success:true, data:product})
})

exports.updateEditProduct = asyncHandler(async(req,res,next) => {

const product = await Product.findByIdAndUpdate(req.params.productId, req.body,{
    new:true
});

if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
}

res
    .status(200)
    .json({ success: true, data: product })


})