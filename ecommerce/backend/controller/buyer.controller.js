const { getAllProducts } = require("../services/product");

const getAllProductsGet = async (req, res) => {
    try {
        const products = await getAllProducts();
        console.log(products);
        res.json(products);
    } catch (err) {
        console.log('error======>', err);
    }
}


// const  = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log('error======>', err);
//     }
// }

module.exports = {
    getAllProductsGet,
}