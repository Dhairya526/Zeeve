/**
 * Return error object corresponding to the error
 * @param {Error} err 
 * @returns {Object} error object
 */
const handleErrors = (err) => {
    // console.log(err, err.message, err.code);
    const errors = {};

    if (err.message === '!access')
        errors.access = 'Unauthorized Access !';
    if (err.message === '!!email')
        errors.email = 'Email already exists';
    if (err.message === '!email' || err.message === '!password')
        errors.login = 'Invalid email/password';
    if (err.message === '!user')
        errors.user = 'User Not Found';
    if (err.message === '!addProduct')
        errors.product = 'Could not add the product';
    if (err.message === '!modifyProduct')
        errors.product = 'Could not modify the product';
    if (err.message === '!deleteProduct')
        errors.product = 'Could not delete the product';

    return errors;
}

module.exports = { handleErrors };