const Product = require('../models/Product');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getProducts = asyncHandler(async(req,res,next) => {
    res.send('get products works')
})

exports.getProduct = asyncHandler(async(req,res,next) => {
    res.send('get single product works')
})