const { runQuery } = require("./mysql");

const addProduct = async (category, name, price, quantity, description, userId) => {

    const sqlDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `INSERT INTO tbl_product( category, name, price, quantity, description, created_by, created_at, modified_by, modified_at) VALUES ('${category}', '${name}', '${price}', '${quantity}', '${description}','${userId}','${sqlDatetime}','${userId}','${sqlDatetime}');`;

    try {
        const result = await runQuery(query);
        if (result.length > 0)
            console.log('product');
    } catch (err) {
        throw err;
    }
}

module.exports = { addProduct };