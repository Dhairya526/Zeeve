const dashRouter = require('express').Router();
const dashController = require('../controller/dashController');
const { validateUser } = require('../middleware/jwt');

dashRouter.get('/dashboard/:userType', validateUser, dashController.get_Dashboard);

module.exports = dashRouter;