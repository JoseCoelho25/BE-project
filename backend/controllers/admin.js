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

exports.adminPhotoUpload = asyncHandler(async(req,res,next) => {
    const product = await Product.findById(req.params.productId)

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
    }

    
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Product.findByIdAndUpdate(req.params.productId, { imageUrl: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  })
})