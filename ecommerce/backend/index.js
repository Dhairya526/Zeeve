const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const sellerRoutes = require('./routes/seller.route');
const buyerRoutes = require('./routes/buyer.route');
const { validateUser } = require('./routes/middleware/jwtAuthToken');
const { transporter } = require('./model/nodemailer.client')
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/authentication', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/seller', validateUser, sellerRoutes);
app.use('/api/v1/buyer', validateUser, buyerRoutes);

app.listen(5000, () => console.log('Running on port 5000'))