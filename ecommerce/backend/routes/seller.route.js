const {
    addProductPost,
    modifyProductPut,
    removeProductDelete,
    getCategoriesGet,
    getProfileGet
} = require('../controller/seller.controller');
const { productRegisterValidation } = require('./middleware/formValidation');

const router = require('express').Router();

router.post('/addProduct', productRegisterValidation, addProductPost);

router.put('/modifyProduct/:id', modifyProductPut);

router.delete('/removeProduct/:id', removeProductDelete);

router.get('/getCategories', getCategoriesGet);

router.get('/profile', getProfileGet);

module.exports = router;