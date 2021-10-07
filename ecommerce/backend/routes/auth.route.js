const router = require('express').Router();
const { signupPost, loginPost } = require('../controller/auth.controller');
const { userRegisterValidation, userLoginValidation } = require('./middleware/formValidation');

router.post('/signup', userRegisterValidation, signupPost);

router.post('/login', userLoginValidation, loginPost);

module.exports = router;