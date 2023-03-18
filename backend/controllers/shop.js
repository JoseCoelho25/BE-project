const Product = require('../models/Product');
const User = require('../models/User')
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');

exports.getProducts = asyncHandler(async(req,res,next) => {
    const products = await Product.find();

    if (!products) {
      return next(new ErrorResponse('Products not found!', 404));
    }
    res.status(200).json({success:true, count:products.length, data:products})
})

exports.getProduct = asyncHandler(async(req,res,next) => {

    const product = await Product.findById(req.params.productId)

    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${req.params.productId}`, 404));
    }

    res.status(201).json({success:true, data:product})
})

exports.postCart = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.body._id);

    const userId = req.user._id
  
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse('User not found!', 404));
    }
    
    // Check if the product is already in the cart
    
    const cartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
    
    if (cartItemIndex >= 0) {
      // If the product is already in the cart, update the quantity
      user.cart.items[cartItemIndex].quantity++ ;
    } else {
      // If the product is not in the cart, add it to the cart
      user.cart.items.push({
        productId: product._id,
        quantity: 1,
        product: product
      });
    }

    await User.updateOne({ _id: userId }, { cart: user.cart });

    res.status(200).json({ success: true, data: user.cart.items});
  });
//

exports.getCart = asyncHandler(async(req,res,next) => {

    userId = req.user._id
  
    const user = await User.findById(userId);
    if(!user){
      return next(new ErrorResponse('User not found!', 404));
    }

    res.status(200).json({success: true, data:user.cart.items})
})

exports.deleteItemFromCart = asyncHandler(async (req, res, next) => {
  const productId = req.body.productId;
  // console.log(productId)
  // console.log(req.user)
  const userId = req.user._id

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Find the item to remove from the user's cart
  const cartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);

  if (cartItemIndex === -1) {
    return next(new ErrorResponse('Item not found in cart', 404));
  }

  // Remove the item from the user's cart
  user.cart.items.splice(cartItemIndex, 1);
  await User.updateOne({ _id: userId }, { cart: user.cart });

  res.status(200).json({
    success: true,
    data:user.cart.items
  });
});

exports.increaseCartQuantity = asyncHandler(async(req,res,next) => {
  const productId = req.body.productId;
  

  const userId = req.user._id

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Find the item to remove from the user's cart
  const cartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);

  if (cartItemIndex >= 0) {
    user.cart.items[cartItemIndex].quantity++;
  }

  await User.updateOne({ _id: userId }, { cart: user.cart });

  res.status(200).json({
    success: true,
    data:user.cart.items
  });
  
})

