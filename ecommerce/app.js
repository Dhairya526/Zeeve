const express = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const dashRoutes = require('./routes/dashRoutes');
const { connection } = require('./model/mysql');
const { checkUser } = require('./middleware/jwt');
const app = express();

process.env.TZ = 'UTC';


//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.render('index');
});

app.use(authRoutes);
app.use(dashRoutes);

app.use((req, res) => {
    res.render('404');
})

app.listen(5000, () => { console.log(`the server is listening on port 5000`) });