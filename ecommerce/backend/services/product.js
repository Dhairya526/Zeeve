const { dbPool } = require("../model/mysql.client");
const { constant } = require("../utils/constants");

/**
 * Add a product to the database to the corresponding user id.
 * @param {string} category 
 * @param {string} name 
 * @param {number} price 
 * @param {number} quantity 
 * @param {string} description 
 * @param {number} userId 
 */
const addProduct = async (category, name, price, quantity, description, userId) => {
    try {
        // userId = 121;
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'INSERT INTO tbl_product (category, name, price, quantity, description, created_by, created_at, modified_by, modified_at) VALUES (?,?,?,?,?,?,?,?,?);';
        const [result] = await dbPool.query(query, [constant.PRODUCT_CATEGORY[category], name, price, quantity, description, userId, sqlDateTimeNow, userId, sqlDateTimeNow]);
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Updates the product details in the database with the associated product id and user id
 * @param {number} productId 
 * @param {string} category 
 * @param {string} name 
 * @param {number} price 
 * @param {number} quantity 
 * @param {string} description 
 * @param {number} userId 
 */
const modifyProduct = async (productId, category, name, price, quantity, description, userId) => {
    try {
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'UPDATE tbl_product SET category=?, name=?, price=?, quantity=?, description=?, modified_by=?, modified_at=? WHERE pid=? AND created_by=?;';
        const [result, rows] = await dbPool.query(query, [category, name, price, quantity, description, userId, sqlDateTimeNow, productId, userId]);
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Removes the product from the database with the associated product id and user id
 * @param {number} productId 
 * @param {number} userId 
 */
const removeProduct = async (productId, userId) => {
    try {
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'DELETE FROM tbl_product WHERE pid=? AND created_by=?;';
        const [result, rows] = await dbPool.query(query, [productId, userId]);
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Returns all ath categories available
 * @returns {object} category object
 */
const getProductCategories = async () => {
    try {
        const categories = {};
        const query = 'SELECT name, code FROM mst_product_type;';
        const [result] = await dbPool.query(query);
        // console.log(result);
        result.forEach((textrow) => {
            categories[textrow.name] = textrow.code;
        });
        return categories;
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Returns all the products available
 * @returns {array} Array of product object
 */
const getAllProducts = async () => {
    try {
        const query = 'SELECT category, name, price, quantity, description FROM tbl_product;';
        const [result] = await dbPool.query(query);
        // console.log(result);
        return result;
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

// const  = async()=>{
//     try {
//         const query = '';
//         const [result] = await dbPool.query(query);
//         console.log(result[0]);
//     } catch (err) {
//         console.log('err-------====>', err);
//         throw err;
//     }
// }

module.exports = {
    addProduct,
    modifyProduct,
    removeProduct,
    getProductCategories,
    getAllProducts,
};