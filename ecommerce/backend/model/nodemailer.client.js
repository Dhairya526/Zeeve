const nodemailer = require('nodemailer');
const { nodeMailerConfig } = require('../nodeMailerConfig');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nodeMailerConfig.username,
        pass: nodeMailerConfig.password
    }
});

module.exports = { transporter };