const express = require('express');

// const { db } = require('./model/mysql.client');
const authRoutes = require('./routes/auth.route')
const sellerRoutes = require('./routes/seller.route');
const buyerRoutes = require('./routes/buyer.route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the homepage');
})
//Routes
app.use('/api/v1/authentication', authRoutes);
app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/buyer', buyerRoutes);

app.listen(5000, () => console.log('Running on port 5000'))