const jwt = require('jsonwebtoken');
const User = require('./users.js')
const _key = "JWT@#$%^&*token"

const createJWT = (name) => {
    const token = jwt.sign({ name },_key,{expiresIn: 60*60*24});
    return token;
};

const authUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, _key, (err, decodedToken) =>{
            if(err){
                console.log(err);
                res.redirect('/login');
            } else {
                console.log("decoded token" ,decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, _key, (err, decodedToken) =>{
            if(err){
                console.log(err);
                res.locals.user = "";
                next();
            } else {
                console.log(decodedToken);
                // const users = User.getUsers();
                const user = User.findUser(decodedToken.name)
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {createJWT, authUser, checkUser}