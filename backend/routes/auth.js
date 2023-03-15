const express = require('express');
const { register, login,logout } = require('../controllers/auth');
const validate = require('../middleware/handleValidation');

const router = express.Router();

//Middlewares
const { userCreateValidation, loginValidation } = require('../middleware/userValidations');


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;