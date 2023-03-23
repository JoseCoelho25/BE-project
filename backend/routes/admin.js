const express = require('express');

const {postNewProduct, getAddProduct, getProducts, getAdminProduct, updateEditProduct, adminPhotoUpload} = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// /admin/add-product => GET
router
.route('/add-product')
.post(protect, authorize('publisher'),postNewProduct)
.get(protect, authorize('publisher'),getAddProduct)

router
.route('/products')
.get(protect, authorize('publisher'),getProducts)

router
.route('/edit-products/:productId')
.get(protect,authorize('publisher'),getAdminProduct)
.put(protect, authorize('publisher'), updateEditProduct)

router
.route('/edit-products/:productId/photo')
.put(protect, authorize('publisher'), adminPhotoUpload )

module.exports = router;