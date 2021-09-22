const { addUser, findUser, checkUserExists, checkUserCredentials } = require('../model/user')
const { generateJWTToken } = require('../middleware/jwt')

const handleErrors = (err) => {
    const errors = {};
    if (err.errno == 1062 || err.message == 'Email already in use') {
        errors.email = 'Email already in use'
    } else if (err.message == 'Email not found')
        errors.email = 'Email not found';
    else if (err.message == 'Invalid password')
        errors.password = 'Invalid password';
    else errors.error = `${err}`;
    return errors;
}

const login_get = (req, res) => {
    res.render('login');
}

const login_post = async(req, res) => {
    const { userType, email, password } = req.body;
    try {
        const alreadyExist = await checkUserExists(userType, email);
        if (alreadyExist) {
            const validPassword = await checkUserCredentials(userType, email, password);
            if (validPassword) {
                const token = generateJWTToken(userType, email);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.status(200).json({ user: {email, userType} });
            } else
                throw Error('Invalid password');
        } else {
            throw Error('Email not found');
        }
    } catch (err) {
        const errors = handleErrors(err);
        // console.log('err----------------------->', err.message);
        res.status(400).json({ errors });
    }

}

const signup_get = (req, res) => {
    res.render('signup');
}

const signup_post = async(req, res) => {
    const { userType, fName, lName, email, password } = req.body;
    // console.log('signup_post', userType, fName, lName, email, password);
    try {
        const alreadyExist = await checkUserExists(userType, email);
        if (!alreadyExist) {
            await addUser(userType, fName, lName, email, password);
            const token = generateJWTToken(userType, email);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            });
            res.status(201).json({ user: {email, userType} });
        } else
            throw Error('Email already in use');
    } catch (err) {
        const errors = handleErrors(err);
        // console.log('err----------------------->', err.message);
        res.status(400).json({ errors });
    }
}
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = { login_get, login_post, signup_get, signup_post, logout }