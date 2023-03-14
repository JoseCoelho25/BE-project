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
    res.send('Got all added products by this user!')
})