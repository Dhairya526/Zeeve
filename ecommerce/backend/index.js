const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const { validateUser } = require('./routes/middleware/jwtAuthToken');

// Express Server
const app = express();

// HTTP and Socket Server
const httpServer = require('http').createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });
module.exports = io;

// Middlewares
app.use(cors());
app.use(express.json());

// Imports
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const sellerRoutes = require('./routes/seller.route');
const buyerRoutes = require('./routes/buyer.route');
const { jwtSocket } = require('./routes/middleware/socketMiddleware');
const { addSocketId, removeSocketId } = require('./services/socket');

// Routes
app.use('/api/v1/authentication', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/seller', validateUser, sellerRoutes);
app.use('/api/v1/buyer', validateUser, buyerRoutes);

// Running Express server
app.listen(5000, () => console.log('Express running on port 5000'));

// Running HTTP and Socket server
httpServer.listen(5001, () => console.log('HTTP server running on port 5001'));

// Socket Middleware
io.use((socket, next) => jwtSocket(socket, next));


io.on('connection', (socket) => {
    // console.log('socket id:', socket.id);
    addSocketId(socket);

    socket.emit('login', { message: 'Welcome' })

    socket.on('disconnect', (reason) => {
        // console.log('socket disconnected id:', socket.id, 'reason', reason);
        removeSocketId(socket)
    });
})
