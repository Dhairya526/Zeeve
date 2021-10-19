const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { config } = require('../config');

/**
 * Returns a random hexadecimal string of length 10
 * @returns {string}
 */
const generateSalt = () => {
    const salt = crypto.randomBytes(config.randomBytesLength / 2).toString('hex');
    return salt;
}

/**
 * Returns password hash for the given password and salt
 * @param {string} password 
 * @param {string} salt 
 * @returns {string}
 */
const hashPassword = (password, salt) => {
    const pass = password + salt;
    const passHash = bcrypt.hashSync(pass, config.saltRounds);
    return passHash;
}

/**
 * Verifies the password hash for the given password and salt
 * @param {string} passHash 
 * @param {string} password 
 * @param {string} salt 
 * @returns {boolean}
 */
const verifyPassword = (passHash, password, salt) => {
    const pass = password + salt;
    const isValid = bcrypt.compareSync(pass, passHash);
    return isValid;
}

module.exports = { generateSalt, hashPassword, verifyPassword };