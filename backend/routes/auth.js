const express = require('express');
const { register, login,logout, resetPassword } = require('../controllers/auth');


const router = express.Router();

//Middlewares
const { protect, authorize } = require('../middleware/auth');


router.post('/register', register);
router.post('/login', login);
router.get('/logout',protect, logout);
router.post('/resetpassword', resetPassword)

module.exports = router;