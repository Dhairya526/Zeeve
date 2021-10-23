const { generateJwtToken } = require("../routes/middleware/jwtAuthToken");
const { registerUser, checkExistance, checkPassword, getUserId, userDetails, verifyLink } = require("../services/user");
const { handleErrors } = require("../utils/errorHandler");
const { constant } = require('../utils/constants');
const { config } = require("../config");
const { sendVerificationLink, sendVerificationOtp } = require("../services/nodeMailer");

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

const verifyEmailGet = async (req, res) => {
    console.log(req.params);
    try {
        const method = req.params.method;
        const email = res.user.email;
        const userId = res.user.userId;
        if (method === 'link') {
            const mailSent = await sendVerificationLink(userId, email);
            if (mailSent)
                return res.json({ success: true });
            else
                return res.json({ success: false });
        }
        else if (method === 'otp') {
            const mailSent = await sendVerificationOtp(userId, email);
            if (mailSent)
                return res.json({ success: true });
            else
                return res.json({ success: false });
        }
        else
            throw Error('!route')

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const confirmEmailGet = async (req, res) => {
    try {
        // console.log('confirm', req.params);
        const method = req.params.method;
        const key = req.params.key;
        // console.log(method, key);
        if (method === 'link') {
            const verified = await verifyLink(key);
            if (verified)
                return res.json({ success: true });
            else
                return res.json({ success: false });
        }
        else if (method === 'otp') {
            return res.json({ method, key })
        }
        else
            return res.json({ msg: 'invalid' })

    } catch (err) {
        console.log('!!!!!!!!!!', err);
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

module.exports = {
    signupPost,
    loginPost,
    logoutGet,
    userDetailsGet,
    verifyEmailGet,
    confirmEmailGet
};