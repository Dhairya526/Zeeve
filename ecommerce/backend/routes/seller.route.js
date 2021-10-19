const {
    addProductPost,
    modifyProductPut,
    removeProductDelete,
    getCategoriesGet,
    getProfileGet,
    getProductsGet
} = require('../controller/seller.controller');
const { productDetailsValidation } = require('./middleware/formValidation');

const router = require('express').Router();

router.post('/addProduct', productDetailsValidation, addProductPost);

router.put('/modifyProduct/:pid', productDetailsValidation, modifyProductPut);

router.delete('/removeProduct/:pid', removeProductDelete);

router.get('/getCategories', getCategoriesGet);

router.get('/profile', getProfileGet);

router.get('/getProducts/:uid', getProductsGet);

module.exports = router;