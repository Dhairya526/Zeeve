const jwt = require('jsonwebtoken');
const { config } = require('../../config');

/**
 * Generates and returns a JWT token
 * @param {object} data 
 * @returns {string} JWT token
 */
const generateJwtToken = (data) => {
    const token = jwt.sign(data, config.jwtKey, { expiresIn: config.jwtTokenExpiery });
    return token;
}

const validateBuyer = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, config.jwtKey);
            if (decodedToken.userType === 'BUYER')
                next();
            else throw Error('invalid user');
        } catch (err) {
            console.log('jwt error');
        }
    } else {
        console.log('jwt error');
    }
}

const validateSeller = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, config.jwtKey);
            if (decodedToken.userType === 'SELLER')
                next();
            else throw Error('invalid user');
        } catch (err) {
            console.log('jwt error');
        }
    } else {
        console.log('jwt error');
    }
}
module.exports = { generateJwtToken };