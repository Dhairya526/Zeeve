const router = require('express').Router();
const { signupPost, loginPost, logoutGet, userDetailsGet, verifyEmailGet, confirmEmailGet } = require('../controller/auth.controller');
const { userRegisterValidation, userLoginValidation } = require('./middleware/formValidation');
const { validateUser } = require('./middleware/jwtAuthToken');

router.post('/signup', userRegisterValidation, signupPost);

router.post('/login', userLoginValidation, loginPost);

router.get('/userDetails/:id', validateUser, userDetailsGet)

router.get('/verify/email/:method', validateUser, verifyEmailGet)

router.get('/confirm/email/:method/:key', confirmEmailGet)

router.get('/logout', logoutGet);

module.exports = router;