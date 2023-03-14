const express = require('express');

const { getProducts, getProduct } = require('../controllers/shop');

const router = express.Router();

router
.route('/')
.get(getProducts)

router
.route('/products/:productId')
.get(getProduct)

// router
// .route('/cart')
// .get(getCart)
// .post(postCart)
// .delete(deleteItemFromCart)

// router
// .route('/checkout')
// .get(getCheckout)

module.exports = router;