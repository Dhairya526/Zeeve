const { generateJwtToken } = require("../routes/middleware/jwtAuthToken");
const { registerUser, checkExistance, checkPassword } = require("../services/user");
const { handleErrors } = require("../utils/errorHandler");
const { constant } = require('../utils/constants');

/**
 * Login POST request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const loginPost = async (req, res) => {
    try {
        const { userType, email, password } = req.body;
        const userExists = await checkExistance(constant.USER[userType], email);
        if (userExists) {
            const isValidPassword = await checkPassword(constant.USER[userType], email, password);
            if (isValidPassword)
                res.json({ user: { userType, email, password } });
            else
                throw Error('!password');
        } else {
            throw Error('!email')
        }
    } catch (err) {
        const errors = handleErrors(err);
        console.log('erroe', err);
        res.status(400).json({ errors });
    }
}

/**
 * Signup POST request controller
 * @param {Request} req 
 * @param {Response} res 
 */
const signupPost = async (req, res) => {
    try {
        const { userType, fName, lName, email, password } = req.body;
        const userExists = await checkExistance(constant.USER[userType], email);
        if (!userExists) {
            const userId = await registerUser(constant.USER[userType], fName, lName, email, password);
            const token = generateJwtToken({ userType, userId });
            res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.json({ user: { userType, fName, lName, email, password } });
        } else {
            throw Error('!!email');
        }
    } catch (err) {
        const errors = handleErrors(err);
        console.log('erroe', err);
        res.status(400).json({ errors });
    }
}

module.exports = { signupPost, loginPost };