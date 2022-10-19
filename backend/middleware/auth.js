const User = require('../models/userModel');
const catchAsyncErrror = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

exports.isAuthUser = catchAsyncErrror( async(req, res, next) => {
  const token = req.cookies.token;
 
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  if(!decode){
    return next(new ErrorHandler('please login to continue', 400));
  }

  req.user = await User.findById(decode.id).select('+password');

  next();
});