const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const { findUser } = require('../../services/user');
const { constant } = require('../../utils/constants');
const { handleErrors } = require('../../utils/errorHandler');

/**
 * Generates and returns a JWT token
 * @param {object} data 
 * @returns {string} JWT token
 */
const generateJwtToken = (data) => {
    const token = jwt.sign(data, config.jwtKey, { expiresIn: config.jwtTokenExpiery });
    return token;
}

const validateUser = async (req, res, next) => {
    try {
        const token = req.header('jwt');
        if (token) {
            try {
                const decodedToken = jwt.verify(token, config.jwtKey);
                const user = await findUser(constant.USER[decodedToken.userType], decodedToken.userId);
                if (user !== {}) {
                    res.user = user;
                    next();
                }
                else
                    throw Error('!access');
            } catch (err) {
                throw Error('!access');
            }
        } else throw Error('!access')
    } catch (error) {
        console.log('jwt error---->', error);
        const errors = handleErrors(error);
        res.json({ errors });
    }
}


module.exports = { generateJwtToken, validateUser };