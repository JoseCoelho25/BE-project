const Product = require('../models/Product');
const User = require('../models/User')
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');

exports.getProducts = asyncHandler(async(req,res,next) => {
    const products = await Product.find();
    res.status(200).json({success:true, count:products.length, data:products})
})

exports.getProduct = asyncHandler(async(req,res,next) => {

    const product = await Product.findById(req.params.productId)

    res.status(201).json({success:true, data:product})
})

exports.postCart = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.body._id);
  
    // Extract user ID from JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
  
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
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
        quantity: 1
      });
    }

    await User.updateOne({ _id: userId }, { cart: user.cart });

    res.status(200).json({ success: true, data: user.cart.items});
  });
//

exports.getCart = asyncHandler(async(req,res,next) => {
  //console.log(req.body)
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
  
    const user = await User.findById(userId);
    if(!user){
      res.status(400).json({success: false, message:'No user found'})
    }

    res.status(200).json({success: true, data:user.cart.items})
})

