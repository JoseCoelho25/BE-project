const express = require('express');

const { getProducts, getProduct, postCart, getCart, deleteItemFromCart, increaseCartQuantity } = require('../controllers/shop');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
.route('/', protect)
.get(getProducts)

router
.route('/products/:productId', protect)
.get(getProduct)

router
.route('/cart' )
.get(protect, getCart)
.post(protect, postCart)
.delete(protect, deleteItemFromCart)
.put(protect, increaseCartQuantity)

// router
// .route('/checkout')
// .get(getCheckout)

module.exports = router;