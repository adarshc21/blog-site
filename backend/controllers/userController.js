const User = require('../models/userModel');
const catchAsyncErrror = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');

// signup user
exports.signup = catchAsyncErrror( async(req, res, next) => {
  const {name, username, email, password} = req.body;

  const user = await User.create({
    name, username, email, password,
    avatar: {
      public_id: 'sample_id',
      url: 'sample.png'
    }
  });

  sendToken(res, user);
});

// login user
exports.login = catchAsyncErrror( async(req, res, next) => {
  const {username, password} = req.body;
  const user = await User.findOne({username: username});
  
  if(!user){
    return next(new ErrorHandler('invalid credentials', 400));
  }

  if(!user.comparePassword(password)){
    return next(new ErrorHandler('invalid credentials', 400));
  }

  sendToken(res, user);
});

// get user details
exports.getUserDetails = catchAsyncErrror( async(req, res, next) => {
  const user = await User.findById(req.user._id);

  if(!user){
    return next(new ErrorHandler('invalid credentials', 400));
  }

  res.json({
    success: true,
    user
  })
});

// logout user
exports.logout = catchAsyncErrror( async(req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});