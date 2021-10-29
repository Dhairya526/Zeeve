const { dbPool } = require("../model/mysql.client");
const io = require('../index');

const addSocketId = async (socket) => {
    try {
        const socketId = socket.id;
        const userId = socket.user.userId;
        console.log('adding', userId, socketId);
        const query = 'INSERT INTO tbl_user_socket(uid, socket_id) VALUES (?,?);';
        const [result] = await dbPool.query(query, [userId, socketId]);
        // console.log(result);
    } catch (err) {
        console.log('socket error ---------->', err);
    }
}

const removeSocketId = async (socket) => {
    try {
        const socketId = socket.id;
        const userId = socket.user.userId;
        console.log('removing', userId, socketId);
        const query = 'DELETE FROM tbl_user_socket WHERE uid=? AND socket_id=?;';
        const [result] = await dbPool.query(query, [userId, socketId]);
        // console.log(result);
    } catch (err) {
        console.log('socket error ---------->', err);
    }
}

const getActiveSockets = async (userId) => {
    try {
        const activeSockets = [];
        const query = 'SELECT socket_id FROM tbl_user_socket WHERE uid=? ;';
        const [result] = await dbPool.query(query, [userId]);
        result.forEach(TextRow => activeSockets.push(TextRow.socket_id));
        return activeSockets;
    } catch (err) {
        console.log('socket error ---------->', err);
    }
}

const emitNotification = async (userId, message) => {
    try {
        const activeSockets = await getActiveSockets(userId);
        activeSockets.forEach(socket => {
            io.to(socket).emit('notification', { message });
        })
    } catch (err) {
        console.log('socket error ---------->', err);
    }
}
module.exports = {
    addSocketId,
    removeSocketId,
    emitNotification
}