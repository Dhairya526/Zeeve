const { addProduct, modifyProduct, removeProduct, getProductCategories, getProducts, checkUserAndProduct } = require("../services/product");
const { userProfile } = require("../services/user");
const { constant } = require("../utils/constants");
const { handleErrors } = require("../utils/errorHandler");

/**
 * Add product POST request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const addProductPost = async (req, res) => {
    try {
        const { category, name, imageBase64, price, quantity, description, userId } = req.body;
        const inserted = await addProduct(constant.PRODUCT_CATEGORY[category], name, imageBase64, price, quantity, description, userId);
        if (inserted)
            res.json({ success: true });
        else
            throw Error('!addProduct');
    } catch (err) {
        const errors = handleErrors(err);
        console.log('error======>', err);
        res.json({ errors });
    }
}

/**
 * Modify product PUT request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const modifyProductPut = async (req, res) => {
    try {
        const productId = req.params.pid;
        const uId = res.user.userId;
        const { category, name, imageBase64, price, quantity, description, userId } = req.body;
        if (uId != userId) {
            console.log(uId, userId);
            throw Error('!access');
        }
        const isIntendedUser = checkUserAndProduct(productId, userId);
        if (isIntendedUser) {
            const updated = await modifyProduct(productId, constant.PRODUCT_CATEGORY[category], imageBase64, name, price, quantity, description, userId);
            if (updated) {
                console.log('updated product');
                res.json({ success: true });
            }
            else
                throw Error('!modifyProduct');
        }
        else
            throw Error('!access');
    } catch (err) {
        const errors = handleErrors(err);
        console.log('error======>', err);
        res.json({ errors });
    }
}

/**
 * Remove product DELETE request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const removeProductDelete = async (req, res) => {
    try {
        const productId = req.params.pid;
        const userId = res.user.userId;
        const isIntendedUser = checkUserAndProduct(productId, userId);
        if (isIntendedUser) {
            const isDeleted = await removeProduct(productId, userId);
            if (isDeleted) {
                console.log('deleted product');
                res.json({ success: true });
            }
            else
                throw Error('!deleteProduct');
        }
        else
            throw Error('!access');
    } catch (err) {
        const errors = handleErrors(err);
        console.log('error======>', err);
        res.json({ errors });
    }
}

const getCategoriesGet = async (req, res) => {
    try {
        const productCategories = await getProductCategories();
        // console.log('cat', productCategories);
        res.json(productCategories);
    } catch (err) {
        const errors = handleErrors(err);
        console.log('error======>', err);
        res.json({ errors });
    }
}

const getProfileGet = (req, res) => {
    try {
        userProfile(121);
    } catch (err) {
        console.log('error======>', err);
    }
}

const getProductsGet = async (req, res) => {
    try {
        const uId = req.params.uid;
        const userId = res.user.userId;
        if (uId != userId) {
            console.log(uId, userId);
            throw Error('!access');
        }
        const products = await getProducts(userId);
        res.json(products);
    } catch (err) {
        const errors = handleErrors(err);
        console.log('error======>', err);
        res.json({ errors });
    }
}

// const  = (req, res) => {
//     try {
//     } catch (err) {
//         console.log('error======>', err);
//     }
// }

module.exports = {
    addProductPost,
    modifyProductPut,
    removeProductDelete,
    getCategoriesGet,
    getProfileGet,
    getProductsGet
};