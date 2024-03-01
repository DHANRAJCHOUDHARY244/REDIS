const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(options) {
    try {
        // Create a SMTP transporter
        const transporter = nodemailer.createTransport({
            service:'gmail', // true for 465, false for other ports
            auth: {
                user: `${process.env.USER}`,
                pass: `${process.env.PASS}`,
            },
        });
      
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: options.email,
            subject: options.otp,
            text: options.otp,
            // html: options.html,
        });

        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, error: 'An error occurred while sending the email' };
    }
}

module.exports = sendEmail;
