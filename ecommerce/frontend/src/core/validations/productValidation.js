const productNameRegex = /^[a-zA-Z0-9 ]{1,50}$/;
const productPriceRegex = /(^0\.\d{1,2}$)|(^[1-9]\d{0,8}(\.\d{1,2})?$)/;
const productQuantityRegex = /^[0-9]+$/;

export const productDetailsValidation = (categories, category, name, price, quantity, description) => {
    const errors = {};
    /**
     * Validate product category
     */
    if (category === undefined || category === null || category === '')
        errors.category = 'Please select a category'
    // else if (!Object.keys(constant.PRODUCT_CATEGORY).includes(category))
    //     errors.category = 'Invalid category'
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
    else if (isNaN(price)) {
        console.log('sdgsgs', typeof (price), price);
        console.log('ss', isNaN(price), price);
        errors.price = 'Enter valid price';
    }
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

    return errors;
}