const jwt = require('jsonwebtoken');
const { config } = require("../../config");
const { findUser } = require('../../services/user');
const { constant } = require('../../utils/constants');

const jwtSocket = async (socket, next) => {
    console.log('middleware');
    try {
        const token = socket.handshake.auth.jwtToken;
        if (token) {
            try {
                const decodedToken = jwt.verify(token, config.jwtKey);
                const user = await findUser(constant.USER[decodedToken.userType], decodedToken.userId);
                if (Object.keys(user).length > 0) {
                    socket.user = user;
                    next();
                }
                else
                    throw Error('!access');
            } catch (err) {
                console.log('err++++++++++++--------->', err);
                throw Error('!access');
            }
        } else throw Error('!access')
    } catch (error) {
        console.log('jwt error---->', error.message);
    };
}
module.exports = { jwtSocket };