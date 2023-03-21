const express = require('express');
const { register, login,logout } = require('../controllers/auth');


const router = express.Router();

//Middlewares
const { protect, authorize } = require('../middleware/auth');


router.post('/register', register);
router.post('/login', login);
router.get('/logout',protect, logout);

module.exports = router;