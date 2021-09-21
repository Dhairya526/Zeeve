const { runQuery } = require('./mysql');

const util = require('../utils/util');

const addUser = async(userType, fName, lName, email, password) => {
    const salt = util.generateSalt();
    const passHash = util.hashPassword(password, salt);
    const sqlDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `INSERT INTO tbl_user(type_id, first_name, last_name, email, password_salt, password_hash, created_at, modified_last) VALUES (${userType},'${fName}','${lName}','${email}','${salt}','${passHash}','${sqlDatetime}','${sqlDatetime}');`;

    try {
        const result = await runQuery(query);
        if (result.length > 0)
            console.log('inserted');
    } catch (err) {
        throw err;
    }
}

const checkUserCredentials = async(userType, email, password) => {
    try {
        const query = `select password_salt, password_hash from tbl_user where type_id = '${userType}' and email = '${email}';`;
        const result = await runQuery(query);
        if (result.length > 0) {
            // console.log(result);
            const passHash = result[0].password_hash;
            const salt = result[0].password_salt;
            const isValidPassword = util.validatePassword(password, salt, passHash);
            return isValidPassword;
        }
    } catch (err) {
        throw err;
    }
}

const checkUserExists = async(userType, email) => {
    try {
        let flag = false;
        const query = `select email from tbl_user where type_id = '${userType}' and email = '${email}';`;
        const result = await runQuery(query);
        if (result.length > 0)
            flag = true;
        return flag;
    } catch (err) {
        throw err;
    }
}

const findUser = async(userType, email) => {
    try {
        const query = `Select first_name, last_name from tbl_user where type_id = '${userType}' and email = '${email}';`;
        const result = await runQuery(query);
        if (result.length > 0) {
            // console.log(result);
            return { userType: userType, fName: result[0].first_name, lName: result[0].last_name, email: email };
        }

    } catch (err) {
        throw err;
    }
}
module.exports = { addUser, findUser, checkUserExists, checkUserCredentials }