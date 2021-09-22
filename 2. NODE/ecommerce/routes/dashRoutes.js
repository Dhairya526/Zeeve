const dashRouter = require('express').Router();
const dashController = require('../controller/dashController');
const { validateUser } = require('../middleware/jwt');

dashRouter.get('/buyerDash', validateUser, dashController.get_buyerDash);
dashRouter.get('/sellerDash', validateUser, dashController.get_sellerDash);
dashRouter.get('/sellerDash/addProduct', validateUser, dashController.get_addProduct);
dashRouter.post('/sellerDash/addProduct', validateUser, dashController.post_addProduct);

module.exports = dashRouter;