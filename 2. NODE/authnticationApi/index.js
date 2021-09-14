const express = require('express');
const authRoutes = require('./auth');
const cookieParser = require('cookie-parser');
const { authUser, checkUser } = require('./jwt');

const app = express();

//midleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

//routes
app.get('*', checkUser);
app.get('/', (req, res) => res.status(200).sendFile(__dirname + '/public/index.html'));
app.get('/dashboard',authUser, (req, res) => res.status(200).sendFile(__dirname + '/public/dashboard.html'));
app.use(authRoutes);

app.listen(5000,()=>console.log('Listening on port 5000'));