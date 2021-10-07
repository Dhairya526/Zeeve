/**
 * Return error object corresponding to the error
 * @param {Error} err 
 * @returns {Object} error object
 */
const handleErrors = (err) => {
    // console.log(err, err.message, err.code);
    const errors = {};
    if (err.message === '!!email')
        errors.email = 'Email already exists';
    if (err.message === '!email' || err.message === '!password')
        errors.login = 'Invalid email/password';
    return errors;
}

module.exports = { handleErrors };