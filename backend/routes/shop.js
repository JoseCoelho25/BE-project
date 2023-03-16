const express = require('express');

const { getProducts, getProduct, postCart } = require('../controllers/shop');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
.route('/')
.get(getProducts)

router
.route('/products/:productId')
.get(getProduct)

router
.route('/cart', protect).post(postCart)
//.get(getCart)

// .delete(deleteItemFromCart)

// router
// .route('/checkout')
// .get(getCheckout)

module.exports = router;