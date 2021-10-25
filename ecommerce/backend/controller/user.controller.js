const { userDetails, modifyUserDetails, verifyLink, verifyToken, resetPassword, verifyOtp } = require("../services/user");
const { handleErrors } = require("../utils/errorHandler");
const { sendVerificationLink, sendVerificationOtp, sendPasswordResetLink } = require("../services/nodeMailer");


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

const modifyUserPut = async (req, res) => {
    try {
        console.log(req.params.uid, '______', res.user.userId);
        const userId = req.params.uid;
        if (userId == res.user.userId) {
            const { fName, lName, email } = req.body;
            const isModified = await modifyUserDetails(userId, fName, lName, email);
            if (isModified)
                res.json({ success: true });
            else
                throw Error('!modifyUser');
        } else
            throw Error('!modifyUser');

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const verifyEmailGet = async (req, res) => {
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

const confirmEmailLinkGet = async (req, res) => {
    try {
        const token = req.params.token;
        const verified = await verifyLink(token);
        if (verified)
            return res.json({ success: true });
        else
            return res.json({ success: false });
    } catch (err) {
        console.log('!!!!!!!!!!', err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const confirmEmailOtpPost = async (req, res) => {
    try {
        const { otp } = req.body;
        const userId = res.user.userId;
        const verified = await verifyOtp(userId, otp);
        if (verified)
            return res.json({ success: true });
        else
            return res.json({ success: false });
    } catch (err) {
        console.log('!!!!!!!!!!', err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const resetPasswordGet = async (req, res) => {
    console.log(req.params);
    try {
        const email = res.user.email;
        const userId = res.user.userId;
        const mailSent = await sendPasswordResetLink(userId, email);
        if (mailSent)
            return res.json({ success: true });
        else
            return res.json({ success: false });

    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const verifyTokenGet = async (req, res) => {
    try {
        const token = req.params.token;
        const verified = await verifyToken(token);
        if (verified)
            return res.json({ success: true });
        else
            return res.json({ success: false });
    } catch (err) {
        console.log('!!!!!!!!!!', err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const setNewPasswordPost = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.params.token;
        const passwordChanged = await resetPassword(token, password);
        if (passwordChanged)
            return res.json({ success: true });
        else
            return res.json({ success: false });
    } catch (err) {
        console.log('!!!!!!!!!!', err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports = {
    userDetailsGet,
    modifyUserPut,
    verifyEmailGet,
    confirmEmailLinkGet,
    confirmEmailOtpPost,
    resetPasswordGet,
    verifyTokenGet,
    setNewPasswordPost
};