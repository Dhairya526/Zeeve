const router = require('express').Router();
const { signupPost, loginPost, logoutGet, userDetailsGet } = require('../controller/auth.controller');
const { userRegisterValidation, userLoginValidation } = require('./middleware/formValidation');

router.post('/signup', userRegisterValidation, signupPost);

router.post('/login', userLoginValidation, loginPost);

router.get('/userDetails/:id', userDetailsGet)

router.get('/logout', logoutGet);

module.exports = router;