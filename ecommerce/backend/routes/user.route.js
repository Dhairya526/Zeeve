const router = require('express').Router();
const { userDetailsGet, modifyUserPut, verifyEmailGet, confirmEmailLinkGet, confirmEmailOtpPost, resetPasswordGet, verifyTokenGet, setNewPasswordPost } = require('../controller/user.controller');
const { validateUser } = require('./middleware/jwtAuthToken');

router.get('/userDetails/:id', validateUser, userDetailsGet);

router.put('/modifyUser/:uid', validateUser, modifyUserPut);

router.get('/verify/email/:method', validateUser, verifyEmailGet);

router.get('/confirm/email/link/:token', confirmEmailLinkGet);

router.post('/confirm/email/otp', validateUser, confirmEmailOtpPost);

router.get('/resetPassword', validateUser, resetPasswordGet);

router.get('/verifyToken:token', verifyTokenGet);

router.post('/resetPassword:token', setNewPasswordPost);

module.exports = router;