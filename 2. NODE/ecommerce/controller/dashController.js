const { addProduct } = require("../model/product");


const get_buyerDash = (req, res) => {
    res.render('buyerDash');
};

const get_sellerDash = (req, res) => {
    res.render('sellerDash');
};

const get_addProduct = (req, res) => {
    res.render('addProduct');
};

const post_addProduct = async(req,res) =>{
    // console.log('req.user',req.user);
    const {category, name, price, quantity, description } = req.body;
    // console.log(category, name, price, quantity, description);
    try {
        await addProduct(category, name, price, quantity, description, req.user.userId);
        
    } catch (err) {
        console.log('err------------->',err);
    }

}

module.exports = { get_buyerDash, get_sellerDash, get_addProduct, post_addProduct };