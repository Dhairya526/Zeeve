import { constant } from "../utils/constants";

const productNameRegex = /^[a-zA-Z0-9 ]{1,50}$/;
const productPriceRegex = /(^0\.\d{1,2}$)|(^[1-9]\d{0,8}(\.\d{1,2})?$)/;
const productQuantityRegex = /^[0-9]+$/;

export const productDetailsValidation = (categories, category, name, image, price, quantity, description) => {
    const errors = {};
    const categoryCodes = [];
    categories.forEach(cat => { categoryCodes.push(cat.code) });
    /**
     * Validate product category
     */
    if (category === undefined || category === null || category === '')
        errors.category = 'Please select a category'
    else if (!categoryCodes.includes(category)) {
        errors.category = 'Invalid category'
    }
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
     * Validate image extension
     */
    if (image !== undefined) {
        console.log(image);
        const imgExt = image.type.split('/')[1];
        if (!constant.imageExtensions.includes(imgExt)) {
            errors.image = 'Invalid Image Format';
            console.log(image);
        }
    }
    else if (image === null) {
        console.log(image);
    }
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