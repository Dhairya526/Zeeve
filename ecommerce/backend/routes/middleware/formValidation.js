const { constant } = require("../../utils/constants");

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userNameRegex = /^[a-zA-Z]{1,15}$/;
const productNameRegex = /^[a-zA-Z0-9 ]{1,50}$/;
const productPriceRegex = /(^0\.\d{1,2}$)|(^[1-9]\d{0,8}(\.\d{1,2})?$)/;
const productQuantityRegex = /^[0-9]+$/;

/**
 * Validate user registration details
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const userRegisterValidation = (req, res, next) => {
    const errors = {};
    const { fName, lName, email, password } = req.body;
    /**
     * Checking errors in first name
     */
    if (fName === '')
        errors.fName = 'First name cannot be empty';
    else if (!userNameRegex.test(fName))
        errors.fName = 'Enter valid name';
    else if (fName.length > 15)
        errors.fName = 'First name can have maximum of 15 characters';
    /**
     * Checking errors in last name
     */
    if (lName === '')
        errors.lName = 'Last name cannot be empty';
    else if (!userNameRegex.test(lName))
        errors.lName = 'Enter valid name';
    else if (lName.length > 15)
        errors.lName = 'Last name can have maximum of 15 characters';
    /**
     * Checking errors in email
     */
    if (email === '')
        errors.email = 'Email cannot be empty';
    else {
        if (!emailRegex.test(email))
            errors.email = 'Invalid email';
    }
    /**
     * Checking errors in password
     */
    if (password === '')
        errors.password = 'Password cannot be empty';
    else if (password.length < 6)
        errors.password = 'Password should have minimum of 6 characters';
    else if (password.length > 15)
        errors.password = 'Password should have maximum of 15 characters';
    /**
     * If there are errors then send them in response object
     * If there are no errors then continue
     */
    if (Object.keys(errors).length !== 0)
        res.json({ errors });
    else
        next();
}

/**
 * Validate user login credentials
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const userLoginValidation = (req, res, next) => {
    const errors = {};
    const { email, password } = req.body;
    if (email === '')
        errors.email = 'Email cannot be empty';
    else {
        if (!emailRegex.test(email))
            errors.email = 'Invalid email';
    }
    /**
     * Checking errors in password
     */
    if (password === '')
        errors.password = 'Password cannot be empty';
    else if (password.length < 6)
        errors.password = 'Password should have minimum of 6 characters';
    else if (password.length > 15)
        errors.password = 'Password should have maximum of 15 characters';
    /**
     * If there are errors then send them in response object
     * If there are no errors then continue
     */
    if (Object.keys(errors).length !== 0)
        res.json({ errors });
    else
        next();
}

/**
 * Validate product registration details
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const productRegisterValidation = (req, res, next) => {
    const errors = {};
    /**
     * Validate product category
     */
    const { category, name, price, quantity, description } = req.body;
    if (category === undefined || category === null || category === '')
        errors.category = 'Please select a category'
    else if (!Object.keys(constant.PRODUCT_CATEGORY).includes(category))
        errors.category = 'Invalid category'

    /**
     * Validate product name
     */
    if (name === '')
        errors.name = 'Name cannot be empty';
    else if (name.length > 50)
        errors.name = 'Name should have a maximum of 50 characters'
    else if (!productNameRegex.test(name))
        errors.name = 'Enter valid name'
    /**
     * Validate product price
     */
    if (price === undefined || price === null || price === '')
        errors.price = 'Price cannot be empty';
    else if (isNaN(price))
        errors.price = 'Enter valid priceee';
    else if (!productPriceRegex.test(price))
        errors.price = 'Enter valid price';
    /**
     * Validate product quantity
     */
    if (quantity === undefined || quantity === null || quantity === '' || quantity === 0)
        errors.quantity = 'Quantity cannot be empty';
    else if (isNaN(quantity))
        errors.quantity = 'Enter valid quantityyy';
    else if (!productQuantityRegex.test(quantity))
        errors.quantity = 'Enter valid quantity';
    /**
     * validate product description
     */
    if (description === '')
        errors.description = 'Description cannot be empty';
    else if (description.length > 500)
        errors.description = 'Description can be of maximum 500 characters';
    // else if (!productDescripptionRegex.test(description))
    //     errors.description = 'Enter valid description';

    /**
     * If there are errors then send them in response object
     * If there are no errors then continue
     */
    if (Object.keys(errors).length !== 0)
        res.json({ errors });
    else
        next();
}

/**
 * Validate product updataion details
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const productUpdateValidation = (req, res, next) => { }

module.exports = {
    userLoginValidation,
    userRegisterValidation,
    productRegisterValidation,
    productUpdateValidation
};