const Product = require('../models/Product');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { uuid } = require('uuidv4');


// @desc      Create a product
// @route     POST /api/admin/add-product
// @access    Private
exports.postNewProduct = asyncHandler(async(req,res,next) => {
  const userId = req.user._id

  var file;
  if (req.files && req.files.image) {
    file = req.files.image;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(new ErrorResponse(`Please upload an image smaller than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }
  
    // Create custom filename
    file.name = `photo_${uuid()}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
    });
  }
  const productData = {...req.body, userId, imageUrl: file.name}

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    data: product
  });
})


// @desc      Get all posted products
// @route     GET /api/admin/products
// @access    Private
exports.getProducts = asyncHandler(async(req,res,next) => {
    const products = await Product.find();

    if (!products) {
      return next(new ErrorResponse('Products not found!', 404));
    }
    res.status(200).json({success:true, count:products.length, data:products})
})


// @desc      Get product to edit
// @route     GET /api/admin/edit-products/:productId
// @access    Private
exports.getAdminProduct = asyncHandler(async(req,res,next) => {
    const product = await Product.findById(req.params.productId)

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
    }

    res.status(201).json({success:true, data:product})
})

// @desc      Update edited product
// @route     PUT /api/admin/edit-products/:productId
// @access    Private
exports.updateEditProduct = asyncHandler(async(req,res,next) => {

  // Extract the category array from the request body
  const { category, ...rest } = req.body;

  // Convert the category string to an array and trim any whitespace
  const categoryArray = category.split(',').map(cat => cat.trim());

  // Combine the remaining fields and the category array into an object
  const updatedProduct = {
    ...rest,
    category: categoryArray
  };

  const product = await Product.findByIdAndUpdate(req.params.productId, updatedProduct, {
    new: true,
  });

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
  }

  if (req.files && req.files.image) {
    const file = req.files.image;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(new ErrorResponse(`Please upload an image smaller than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${product._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      await Product.findByIdAndUpdate(product._id, { imageUrl: file.name });
    });
  }

  res.status(200).json({ success: true, data: product });

});


// @desc      Update edited photo
// @route     PUT /api/admin/edit-products/:productId/photo
// @access    Private
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


// @desc      Delete product from db
// @route     DELETE /api/admin/products
// @access    Private
exports.deleteAdminProduct = asyncHandler(async(req,res,next) => {

  const productId = req.body.productId
  
  const product = await Product.findById(productId);
  
    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${productId}`, 404));
    }
  
    await product.deleteOne();
  
    res.status(200).json({ success: true, data: {} });
})