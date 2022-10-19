const { signup, login, getUserDetails, logout } = require('../controllers/userController');
const { isAuthUser } = require('../middleware/auth');

const router = require('express').Router();

router.route('/signup').post(signup);
router.route('/login').get(login);
router.route('/me').get(isAuthUser, getUserDetails);
router.route('/logout').get(isAuthUser, logout);
module.exports = router;