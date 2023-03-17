const express = require('express');

const { getProducts, getProduct, postCart, getCart, deleteItemFromCart } = require('../controllers/shop');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
.route('/', protect)
.get(getProducts)

router
.route('/products/:productId', protect)
.get(getProduct)

router
.route('/cart', protect)
.get(getCart)
.post(postCart)
.delete(deleteItemFromCart)

// router
// .route('/checkout')
// .get(getCheckout)

module.exports = router;