//  ----------------redis---------------- 
const { redisClient } = require('../utils/redisClient');

// ----------------error----------------
const { handleServerError, handleNotFoundError, handleBadRequestError } = require('../utils/errorHandler');

// ----------------otp----------------
const generateOtp = require('../utils/otpGen')

// ----------------Send Email----------------
const sendEmail = require('../utils/email')

async function addOTP(req, res) {
    try {
        const { email } = req.body.task;
        const otp = generateOtp();


        const options = { email, otp };
        const emailResponse = await sendEmail(options);

        if (emailResponse.success) {
            await redisClient.setEx(email, 60, otp);
            res.send(emailResponse.response);
        }
        else{
            handleServerError(res, err, emailResponse.error);
        }

    } catch (err) {
        handleServerError(res, err, 'Failed to add OTP');
    }
}

async function verifyOTP(req, res) {
    try {
        const { verEmail, otp } = req.body.task;

        const storedOTP = await redisClient.get(verEmail);
        if (!storedOTP) {
            handleNotFoundError(res, 'OTP not found');
            return;
        }
        if (storedOTP === otp) {
            res.json({ message: 'OTP Verified' });
        } else {
            res.json({ message: 'Error: Please verify again' }); 
        }
    } catch (err) {
        handleServerError(res, err, 'Failed to verify OTP');
    }
}

module.exports = {
    addOTP,
    verifyOTP
};
