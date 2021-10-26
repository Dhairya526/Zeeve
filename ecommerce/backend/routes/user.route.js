const router = require('express').Router();
const { userDetailsGet, modifyUserPut, verifyEmailGet, confirmEmailLinkGet, confirmEmailOtpPost, resetPasswordGet, verifyTokenGet, setNewPasswordPost } = require('../controller/user.controller');
const { passwordValidation, otpValidation, userUpdateValidation } = require('./middleware/formValidation');
const { validateUser } = require('./middleware/jwtAuthToken');

router.get('/userDetails/:id', validateUser, userDetailsGet);

router.put('/modifyUser/:uid', validateUser, userUpdateValidation, modifyUserPut);

router.get('/verify/email/:method', validateUser, verifyEmailGet);

router.get('/confirm/email/link/:token', confirmEmailLinkGet);

router.post('/confirm/email/otp', validateUser, otpValidation, confirmEmailOtpPost);

router.get('/resetPassword', validateUser, resetPasswordGet);

router.get('/verifyToken/:token', verifyTokenGet);

router.post('/resetPassword/:token', passwordValidation, setNewPasswordPost);

module.exports = router;