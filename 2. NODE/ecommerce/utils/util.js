const bcrypt = require('bcrypt');
const crypto = require('crypto');

const generateSalt = () => {
    const salt = crypto.randomBytes(5).toString('hex');
    return salt;
}

const hashPassword = (password, salt, rounds = 5) => {
    const passHash = bcrypt.hashSync(password + salt, rounds);
    return passHash;
}

const validatePassword = (password, salt, passHash) => {
    const flag = bcrypt.compareSync(password + salt, passHash);
    return flag;
}

module.exports = { hashPassword, validatePassword, generateSalt };