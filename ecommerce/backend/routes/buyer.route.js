const { getAllProductsGet } = require('../controller/buyer.controller');

const router = require('express').Router();

router.get('/products', getAllProductsGet);

module.exports = router;