const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async(req,res,next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
    name,
    email,
    password,
    role
    });


    sendTokenResponse(user, 200, res);

})


// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
})

// @desc      Reset user password
// @route     POST /api/auth/reset-password
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get email and new password from request body
    const { email, password } = req.body;
  
    // Find user with matching email
    const user = await User.findOne({ email });
  
    // If user not found, return error response
    if (!user) {
      return next(new ErrorResponse('User not found with that email', 404));
    }
  
    // Set new password and save user
    await User.updateOne({ password: password });
   
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  });

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    //res.status(200).json({ success: true, token });
    const options = {
        expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    
    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        userData:user
    });
    
    }