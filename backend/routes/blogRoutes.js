const { createBlog, getAllBlogs, getBlogDetails, updateBlog, deleteBlog, myBlogs } = require('../controllers/blogController');
const { isAuthUser } = require('../middleware/auth');

const router = require('express').Router();

router.route('/').get(getAllBlogs).post(isAuthUser, createBlog);

router.route('/:id').get(getBlogDetails).put(isAuthUser, updateBlog).delete(isAuthUser, deleteBlog);

module.exports = router;