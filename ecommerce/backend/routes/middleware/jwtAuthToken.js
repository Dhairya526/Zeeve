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

module.exports = { generateJwtToken };