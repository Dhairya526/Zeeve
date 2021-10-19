const { generateJwtToken } = require("../routes/middleware/jwtAuthToken");
const { registerUser, checkExistance, checkPassword, getUserId, userProfile, userDetails } = require("../services/user");
const { handleErrors } = require("../utils/errorHandler");
const { constant } = require('../utils/constants');
const { config } = require("../config");

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
            if (isValidPassword) {
                const userId = await getUserId(constant.USER[userType], email);
                const token = generateJwtToken({ userType, userId });
                const user = await userDetails(userId);
                res.json({ user, token })
            }
            else
                throw Error('!password');
        } else {
            throw Error('!email')
        }
    } catch (err) {
        const errors = handleErrors(err);
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
            res.json({ user: { userType, fName, lName, email, password }, token });
        } else {
            throw Error('!!email');
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const userDetailsGet = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await userDetails(userId);
        if (Object.keys(userData).length !== 0)
            res.json({ userData });
        else
            throw Error('!user');

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
/**
 * Clears the jwt cookie
 * @param {Request} req 
 * @param {Response} res 
 */
const logoutGet = (req, res) => {
}

module.exports = { signupPost, loginPost, logoutGet, userDetailsGet };