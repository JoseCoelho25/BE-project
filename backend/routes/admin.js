const express = require('express');

const {postAddProduct, getAddProduct, getProducts} = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// /admin/add-product => GET
router
.route('/add-product')
.post(protect, authorize('publisher'),postAddProduct)
.get(getAddProduct)

router
.route('/products')
.get(getProducts)

router.get('/publishers-only', protect, authorize('publisher'), (req, res) => {
    res.send('This route is only accessible to publishers.');
});

module.exports = router;