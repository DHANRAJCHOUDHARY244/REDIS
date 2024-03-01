const nodemailer = require('nodemailer');
require('dotenv').config();

const htmlTemplate = require('../template/mailTemplate')
async function sendEmail(options) {
    const htmlTemp = await htmlTemplate(options)
    console.log(process.env.USER, process.env.PASS, '.................');
    try {
        // Create a SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // true for 465, false for other ports
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `'${process.env.EMAIL_FROM}'`,
            to: options.email,
            subject: 'OTP VERIFICATION',
            html: htmlTemp,
        });

        console.log('Email sent successfully:', info.messageId);
        return { success: true, message: 'Email sent Successfully' };
    } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, error: 'An error occurred while sending the email' };
    }
}

module.exports = sendEmail;
