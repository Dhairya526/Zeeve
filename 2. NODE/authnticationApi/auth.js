const express = require('express');
const path = require('path');
const { createJWT } = require('./jwt');
const { addUser, verifyUser } = require('./users.js');
const router = express.Router();

router.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/signup.html'));
});


router.get('/login', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, '/public/login.html'));
});


router.post('/signup', (req, res)=>{
    const {username, password} = req.body;
    console.log("From post.signup", username, password);
    const user = addUser(username, password);
    const token = createJWT(user.username);
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000*60*60*24
    })
    res.status(201).json({user: user.username});
});


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const validUser = verifyUser(username, password);
    if(validUser){
        const token = createJWT(username);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 1000*60*60*24
        })
        res.status(200).json({user: username});
    }
    else
        res.status(401).json({error: 'Invalid username/password'});
});

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

module.exports = router;