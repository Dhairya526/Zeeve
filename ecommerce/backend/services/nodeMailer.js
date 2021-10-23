const { dbPool } = require("../model/mysql.client");
const { transporter } = require("../model/nodemailer.client");
const jwt = require('jsonwebtoken');

const sendVerificationLink = async (userId, email) => {
    try {
        const query = 'SELECT password_hash FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        const passwordHash = result[0].password_hash;
        console.log(passwordHash);
        const token = jwt.sign({ userId }, passwordHash, { expiresIn: '15m' })
        const verificationLink = `http://localhost:3000/confirm/email/link/${token}`;
        let mailOptions = {
            from: 'dhairya.dhuvad@zeeve.io',
            to: email,
            subject: 'Verify your MyEcommerce account',
            html: `
            <h2>Please verify your email</h2>
            <p>The link will expire in 15 minutes.</p>
            <p><a href=${verificationLink}>Click here</a> to verify</p>
            `
        }
        const info = await transporter.sendMail(mailOptions);
        return info.response.includes('OK');
    } catch (err) {
        console.log(err);
        throw Error('!verificationEmail');
    }
}

const sendVerificationOtp = async (userId, email) => {
    try {
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += Math.random().toString().slice(6, 9) % 10;
        }
        let mailOptions = {
            from: 'dhairya.dhuvad@zeeve.io',
            to: email,
            subject: 'Test mail',
            html: `
            <h2>Please verify your email</h2>
            <br><br>
            <p>The otp will expire in 15 minutes.</p>
            <p><strong>OTP</strong>${otp}</p>
            `
        }
        const info = await transporter.sendMail(mailOptions);
        return info.response.includes('OK');
    } catch (err) {
        console.log(err);
        throw Error('!verificationEmail');
    }
}

module.exports = { sendVerificationLink, sendVerificationOtp };