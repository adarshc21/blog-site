const Blog = require('../models/blogModel');
const catchAsyncErrror = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');

// create blog
exports.createBlog = catchAsyncErrror(async (req, res, next) => {
  const {title, description, category, tags} = req.body;

  const blog = await Blog.create({
    title, description, category, tags,
    image: {
      public_id: 'sample_id',
      url: 'photo.png'
    },
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    blog
  });
});

// get all blog
exports.getAllBlogs = catchAsyncErrror(async (req, res, next) => {
  const pageSize = req.query.pageSize || 8;
  const blogCount= await Blog.countDocuments();

  const apiFeatures = new ApiFeatures( Blog.find() , req.query).search().filter().pagination(pageSize);
  const blogs = await apiFeatures.query;
  
  res.status(200).json({
    success: true,
    blogCount,
    pageSize,
    blogs
  });
});

// get all blog
exports.getBlogDetails = catchAsyncErrror(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if(!blog){
    return next(new ErrorHandler('blog not found', 404));
  }
  
  res.status(200).json({
    success: true,
    blog
  });
});

// update blog
exports.updateBlog = catchAsyncErrror(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if(!blog){
    return next(new ErrorHandler('blog not found', 404));
  }

  if(blog.user === req.user._id){
    return next(new ErrorHandler('blog not found', 404));
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModified: false
  });

  res.status(200).json({
    success: true,
    blog
  });
});

// delete blog
exports.deleteBlog = catchAsyncErrror(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if(!blog){
    return next(new ErrorHandler('blog not found', 404));
  }

  if(blog.user === req.user._id){
    return next(new ErrorHandler('blog not found', 404));
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: 'blog deleted successfully'
  });
});


// get logged user blogs
exports.myBlogs = catchAsyncErrror(async (req, res, next) => {
  let blog = await Blog.findById(req.user._id);

  res.status(200).json({
    success: true,
    message: 'blog deleted successfully'
  });
});