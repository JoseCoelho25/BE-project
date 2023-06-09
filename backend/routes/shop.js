const express = require('express');

const { getProducts, getProduct, postCart, getCart, deleteItemFromCart, increaseCartQuantity,decreaseCartQuantity, createCheckoutSession, createPaymentIntent, createOrder, getOrder } = require('../controllers/shop');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
.route('/', protect)
.get( getProducts)

router
.route('/products/:productId', protect)
.get(getProduct)

router
.route('/cart' )
.get(protect, getCart)
.post(protect, postCart)
.delete(protect, deleteItemFromCart)

router
.route('/cart/addItemToCart')
.put(protect, increaseCartQuantity)

router
.route('/cart/descreaseItemToCart')
.put(protect, decreaseCartQuantity)

router
.route('/checkout')
.post(protect, createCheckoutSession)

router.route('/create-payment-intent')
.post(protect, createPaymentIntent)

router.route('/orders')
.post(protect, createOrder)

router.route('/orders/:orderId')
.get(protect, getOrder)

module.exports = router;