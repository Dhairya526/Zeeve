const jwt = require('jsonwebtoken');
const { findUser } = require('../model/user');

const _key = 'J!@#$%W^&*()T!@#$%^&*()tOkEn';
const maxAge = 60 * 60 * 24;

const generateJWTToken = (userType, email) => {
    const token = jwt.sign({ userType, email }, _key, { expiresIn: maxAge });
    return token;
}

const validateUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, _key, (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
                console.log('jwt error', err);
            } else if (req.params.userType == decodedToken.userType)
                next();
            else
                res.redirect('/login');
        });
    } else
        res.redirect('/login');
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, _key, async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = "";
                next();
            } else {
                const user = await findUser(decodedToken.userType, decodedToken.email)
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { generateJWTToken, validateUser, checkUser };