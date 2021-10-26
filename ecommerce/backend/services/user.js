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
        // console.log(userType, fName, lName, email, password);
        const query = 'INSERT INTO tbl_user(type_id, first_name, last_name, email, password_salt, password_hash, created_at, modified_last) VALUES (?,?,?,?,?,?,?,?);';
        const [result] = await dbPool.query(query, [userType, fName, lName, email, salt, passwordHash, sqlDateTimeNow, sqlDateTimeNow]);
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

const modifyUserDetails = async (userId, fName, lName, email) => {
    try {
        const query = 'UPDATE tbl_user SET first_name=?, last_name=?, email=?, verified=? WHERE uid=? ;';
        const [result] = await dbPool.query(query, [fName, lName, email, 0, userId]);
        // console.log(result);
        return result.changedRows > 0;
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

const verifyToken = async (token) => {
    try {
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.userId;
        const query = 'SELECT password_hash FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        const passwordHash = result[0].password_hash;
        const verifiedToken = jwt.verify(token, passwordHash);
        if (verifiedToken) {
            return [true, userId];
        }
        else
            return false;
    } catch (err) {
        console.log('error--------->', err);
        throw Error('!access');
    }
}

const verifyLink = async (token) => {
    try {
        const [validToken, userId] = await verifyToken(token);
        if (validToken) {
            const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = 'UPDATE tbl_user SET verified=?, modified_last=? WHERE uid=?;';
            const [result] = await dbPool.query(query, [1, sqlDateTimeNow, userId]);
            return true;
        }
        else
            return false;
    } catch (err) {
        console.log('error--------->', err);
        throw Error('!verify');
    }
}

const verifyOtp = async (userId, otp) => {
    try {
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'SELECT otp, generated_at FROM tbl_otp WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        if (otp == result[result.length - 1].otp) {
            const otpDateTime = result[result.length - 1].generated_at;
            const difference = new Date(sqlDateTimeNow) - new Date(otpDateTime);
            if (difference < 900000) {
                const query = 'UPDATE tbl_user SET verified=?, modified_last=? WHERE uid=?;';
                const [result] = await dbPool.query(query, [1, sqlDateTimeNow, userId]);
                const query2 = 'UPDATE tbl_otp SET used=? WHERE uid=? AND otp=?;';
                const [result2] = await dbPool.query(query2, [1, userId, otp]);
                if (result.affectedRows > 0)
                    return true;
                else
                    return false;
            } else
                return false;
        } else
            return false;

    } catch (err) {
        console.log('error--------->', err);
        throw Error('!verify');
    }
}

const resetPassword = async (userId, password) => {
    try {
        const salt = generateSalt();
        const passwordHash = hashPassword(password, salt);
        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = 'UPDATE tbl_user SET password_salt=?, password_hash=?, modified_last=? WHERE uid=?;';
        const [result] = await dbPool.query(query, [salt, passwordHash, sqlDateTimeNow, userId]);
        if (result.affectedRows == 1)
            return true;
        else
            return false;
    } catch (err) {
        console.log('error--------->', err);
        throw Error('!changePassword');
    }
}


// const  = async () => {
//     try {
// const query='';
// const [result]=await dbPool.query(query,[]);
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
    modifyUserDetails,
    getUserId,
    verifyToken,
    verifyLink,
    verifyOtp,
    resetPassword
};