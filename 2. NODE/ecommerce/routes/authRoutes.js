const authRouter = require('express').Router();

const authController = require('../controller/authController');
const { validateForm } = require('../middleware/validateForm');

authRouter.get('/login', authController.login_get);

authRouter.post('/login', validateForm, authController.login_post);

authRouter.get('/signup', authController.signup_get);

authRouter.post('/signup', validateForm, authController.signup_post);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;