const { dbPool } = require("../model/mysql.client");
const { transporter } = require("../model/nodemailer.client");
const jwt = require('jsonwebtoken');

/**
 * Sends a verification link to the email
 * @param {number} userId 
 * @param {string} email 
 * @returns {boolean}
 */
const sendVerificationLink = async (userId, email) => {
    try {
        const query = 'SELECT password_hash FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        const passwordHash = result[0].password_hash;
        console.log(passwordHash);
        const token = jwt.sign({ userId }, passwordHash, { expiresIn: '15m' });
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
        throw Error('!sendEmail');
    }
}

/**
 * Sends an OTP to the email
 * @param {number} userId 
 * @param {string} email 
 * @returns {boolean}
 */
const sendVerificationOtp = async (userId, email) => {
    try {
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += Math.random().toString().slice(6, 9) % 10;
        }

        const sqlDateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log('otp generated at :', sqlDateTimeNow);
        const query = 'INSERT INTO tbl_otp (uid, otp, generated_at) VALUES (?,?,?);';
        const [result] = await dbPool.query(query, [userId, otp, sqlDateTimeNow]);
        if (result.affectedRows == 1 && result.insertId > 0) {
            let mailOptions = {
                from: 'dhairya.dhuvad@zeeve.io',
                to: email,
                subject: 'Verify your MyEcommerce account',
                html: `
                <h2>Please verify your email</h2>
                <h3>The otp will expire in 15 minutes.</h3>
                <h3><strong>OTP : </strong></h3><h1>${otp}</h1>
                `
            }
            const info = await transporter.sendMail(mailOptions);
            return info.response.includes('OK');
        }
        else
            throw Error('!otpInserted');
    } catch (err) {
        console.log(err);
        throw Error('!sendEmail');
    }
}

const sendPasswordResetLink = async (userId, email) => {
    try {
        const query = 'SELECT password_hash FROM tbl_user WHERE uid=?;';
        const [result] = await dbPool.query(query, [userId]);
        const passwordHash = result[0].password_hash;
        console.log(passwordHash);
        const token = jwt.sign({ userId }, passwordHash, { expiresIn: '15m' });
        const verificationLink = `http://localhost:3000/reset/password/${token}`;
        let mailOptions = {
            from: 'dhairya.dhuvad@zeeve.io',
            to: email,
            subject: 'Reset your MyEcommerce account password',
            html: `
            <p>The link will expire in 15 minutes.</p>
            <p><a href=${verificationLink}>Click here</a> to reset your password.</p>
            `
        }
        const info = await transporter.sendMail(mailOptions);
        return info.response.includes('OK');
    } catch (err) {
        console.log(err);
        throw Error('!sendEmail');
    }
}

module.exports = {
    sendVerificationLink,
    sendVerificationOtp,
    sendPasswordResetLink
};