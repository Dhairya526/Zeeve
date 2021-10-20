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
const addProduct = async (category, name, imageBase64, price, quantity, description, userId) => {
    try {
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'INSERT INTO tbl_product (category, name, image, price, quantity, description, created_by, created_at, modified_by, modified_at) VALUES (?,?,?,?,?,?,?,?,?,?);';
        const [result] = await dbPool.query(query, [category, name, imageBase64, price, quantity, description, userId, sqlDateTimeNow, userId, sqlDateTimeNow]);
        return result.insertId;
    } catch (err) {
        console.log('err-------====>', err);
        throw Error('!addProduct');
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
const modifyProduct = async (productId, category, name, imageBase64, price, quantity, description, userId) => {
    try {
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'UPDATE tbl_product SET category=?, name=?, image=?, price=?, quantity=?, description=?, modified_by=?, modified_at=? WHERE pid=? AND created_by=?;';
        const [result, rows] = await dbPool.query(query, [category, name, imageBase64, price, quantity, description, userId, sqlDateTimeNow, productId, userId]);
        // console.log('Updated', result);
        return result.changedRows > 0;
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
        // const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'DELETE FROM tbl_product WHERE pid=? AND created_by=?;';
        const [result, rows] = await dbPool.query(query, [productId, userId]);
        return result.affectedRows > 0;
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
        const categories = [];
        const query = 'SELECT name, code FROM mst_product_type;';
        const [result] = await dbPool.query(query);
        // console.log(result);
        result.forEach((textrow) => {
            const name = textrow.name;
            const code = textrow.code;
            categories.push({ code, name });
        });
        return categories;
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Returns all the products available
 * @returns {array} Array of product objects
 */
const getAllProducts = async () => {
    try {
        const query = 'SELECT p.pid, m.code AS category, p.name, p.image, p.price, p.quantity, p.description FROM tbl_product AS p INNER JOIN mst_product_type AS m WHERE p.category = m.type_id;';
        const [result] = await dbPool.query(query);
        // console.log(result);
        return result;
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Returns products based on the userId passed
 * @param {number} userId 
 * @returns {array} Array of product objects
 */
const getProducts = async (userId) => {
    try {
        const query = 'SELECT p.pid, m.code AS category, p.name, p.image, p.price, p.quantity, p.description FROM tbl_product AS p INNER JOIN mst_product_type AS m WHERE p.category = m.type_id AND p.created_by=?;';
        const [result] = await dbPool.query(query, [userId]);
        console.log('%%%%%%%%%%%%%', result);
        return result;
    } catch (err) {
        console.log('err-------====>', err);
        throw err;
    }
}

/**
 * Checks whether the productId is associated with the userId or not
 * @param {number} productId 
 * @param {number} userId 
 * @returns {boolean}
 */
const checkUserAndProduct = async (productId, userId) => {
    try {
        const query = 'SELECT * FROM tbl_product WHERE pid=? AND created_by=?';
        const [result] = await dbPool.query(query, [productId, userId]);
        if (result.length > 0)
            return true;
        else
            return false;
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
    getProducts,
    checkUserAndProduct
};