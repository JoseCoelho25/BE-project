const express = require('express');

const {postAddProduct, getAddProduct, getProducts} = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router
.route('/add-product')
.post(postAddProduct)
.get(getAddProduct)

router
.route('/products')
.get(getProducts)

module.exports = router;