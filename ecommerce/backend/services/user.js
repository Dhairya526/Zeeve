const jwt = require('jsonwebtoken');

const { dbPool } = require("../model/mysql.client");
const { constant } = require("../utils/constants");
const { generateSalt, hashPassword, verifyPassword } = require("../utils/crypto");

/**
 * Registers the user to the database
 * @param {number} userType 
 * @param {string} fName 
 * @param {string} lName 
 * @param {string} email 
 * @param {string} password
 * @returns {number} user id
 */
const registerUser = async (userType, fName, lName, email, password) => {
    try {
        const salt = generateSalt();
        const passwordHash = hashPassword(password, salt);
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(userType, fName, lName, email, password);
        const query = 'INSERT INTO tbl_user(type_id, first_name, last_name, email, password_salt, password_hash, created_at, modified_last) VALUES (?,?,?,?,?,?,?,?);';
        const [result, rows] = await dbPool.query(query, [userType, fName, lName, email, salt, passwordHash, sqlDateTimeNow, sqlDateTimeNow]);
        // console.log('result', result);
        return result.insertId;
    } catch (err) {
        console.log('err----------------->', err);
        throw err;
    }
}

/**
 * Checks if the user with the provided email exists or not.
 * @param {number} userType 
 * @param {string} email 
 * @returns {boolean}
 */
const checkExistance = async (userType, email) => {
    try {
        const query = 'SELECT uid FROM tbl_user WHERE type_id=? AND email=?;';
        const [result, rows] = await dbPool.query(query, [userType, email]);
        // console.log('ressssssssssssssult', result);
        return !!result.length;
    } catch (err) {
        console.log('err---------->', err);
        throw err;
    }
}

/**
 * Check the validity of password
 * @param {*} userType 
 * @param {*} email 
 * @param {*} password 
 */
const checkPassword = async (userType, email, password) => {
    try {
        const query = 'SELECT password_salt, password_hash FROM tbl_user WHERE email = ? AND type_id = ?;';
        const [result, rows] = await dbPool.query(query, [email, userType]);
        // console.log('result', result[0].password_hash);
        const isValidPass = verifyPassword(result[0].password_hash, password, result[0].password_salt);
        return isValidPass;
    } catch (err) {
        console.log('error--------->', err);
        throw err;
    }
}

/**
 * Finds and returns an object with associated user type and email.
 * Returns an empty object if the user doesnot exists.
 * @param {number} userType 
 * @param {string} email 
 * @returns {object}
 */
const findUser = async (userType, userId) => {
    try {
        const user = {};
        const query = 'SELECT uid, type_id, email, first_name, last_name FROM tbl_user WHERE uid=? AND type_id=?;';
        const [result] = await dbPool.query(query, [userId, userType]);
        if (result.length > 0) {
            user.userId = result[0].uid;
            user.userType = Object.keys(constant.USER).find(key => constant.USER[key] === result[0].type_id);
            user.email = result[0].email;
            user.fName = result[0].first_name;
            user.lName = result[0].last_name;
        }
        return user;
    } catch (err) {
        console.log('error--------->', err);
        throw err;
    }
}

/**
 * Returns user details : type, first name, last name, email.
 * @param {number} userId 
 * @returns {object} user details
 */
const userDetails = async (userId) => {
    try {
        const userData = {};
        const query = 'SELECT  type_id, first_name, last_name, email, verified FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        // console.log(result);
        if (result.length > 0) {
            userData.userType = Object.keys(constant.USER).find(key => constant.USER[key] === result[0].type_id);
            userData.fName = result[0].first_name;
            userData.lName = result[0].last_name;
            userData.email = result[0].email;
            userData.verified = Object.keys(constant.VERIFICATION).find(key => constant.VERIFICATION[key] === result[0].verified);
        }
        // console.log(userData);
        return userData;
    } catch (err) {
        console.log('error--------->', err);
        throw err;
    }
}

/**
 * Returns the user id associated with the giver userType and email
 * @param {*} userType 
 * @param {*} email 
 * @returns {number} user id
 */
const getUserId = async (userType, email) => {
    try {
        const query = 'SELECT uid FROM tbl_user WHERE type_id=? AND email=?;';
        const [result] = await dbPool.query(query, [userType, email]);
        return result[0].uid;
    } catch (err) {
        console.log('error--------->', err);
        throw err;
    }
}

const verifyLink = async (key) => {
    try {
        const decodedToken = jwt.decode(key);
        const userId = decodedToken.userId;
        const query = 'SELECT password_hash FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        const passwordHash = result[0].password_hash;
        const verifiedToken = jwt.verify(key, passwordHash);
        if (verifiedToken)
            return true;
        else
            return false;
    } catch (err) {
        console.log('error--------->', err);
        throw err;
    }
}

// const  = async (userType, email) => {
//     try {
// const [result]=await dbPool.query();
//     } catch (err) {
//         console.log('error--------->', err);
//         throw err;
//     }
// }


module.exports = {
    registerUser,
    checkExistance,
    checkPassword,
    findUser,
    userDetails,
    getUserId,
    verifyLink,
};