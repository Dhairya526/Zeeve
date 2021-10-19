const { getAllProductsGet } = require('../controller/buyer.controller');
const { getProfileGet } = require('../controller/seller.controller');

const router = require('express').Router();

router.get('/products', getAllProductsGet);

router.get('/profile', getProfileGet);

module.exports = router;