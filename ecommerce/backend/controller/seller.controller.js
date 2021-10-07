const { addProduct, modifyProduct, removeProduct, getProductCategories } = require("../services/product");
const { userProfile } = require("../services/user");

/**
 * Add product POST request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const addProductPost = (req, res) => {
    try {
        const { category, name, price, quantity, description } = req.body;
        addProduct(category, name, price, quantity, description);
    } catch (err) {
        console.log('error======>', err);
    }
}

/**
 * Modify product PUT request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const modifyProductPut = (req, res) => {
    try {
        const { productId } = req.params;
        modifyProduct();
    } catch (err) {
        console.log('error======>', err);
    }
}

/**
 * Remove product DELETE request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const removeProductDelete = (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;
        removeProduct(productId, userId);
    } catch (err) {
        console.log('error======>', err);
    }
}

const getCategoriesGet = async (req, res) => {
    try {
        const productCategories = await getProductCategories();
        // console.log('cat', productCategories);
        res.json(productCategories);
    } catch (err) {
        console.log('error======>', err);
    }
}

const getProfileGet = (req, res) => {
    try {
        userProfile(121);
    } catch (err) {
        console.log('error======>', err);
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
    getProfileGet
};