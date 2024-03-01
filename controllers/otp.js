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
            await redisClient.setEx(email, 60, `${otp}`);
            console.log('----------------TTL VALUE:', await redisClient.ttl(email), email, 's OF ', email);
            console.log(emailResponse.message);
            res.json({ message: emailResponse.message });
        }
        else {
            const err = 'Mail Not sent';
            handleServerError(res, err, emailResponse.error);
        }

    } catch (err) {
        handleServerError(res, err, 'Failed to add OTP');
    }
}

async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body.task;

        const storedOTP = await redisClient.get(email);
        console.log(storedOTP, email);
        if (!storedOTP) {
            handleNotFoundError(res, 'OTP not found');
            return;
        }
        if (storedOTP == otp) {
            res.json({ message: 'OTP Verified' });
        } else {
            res.json({ message: 'Error:Invalid OTP Or Expired !! Please verify again or Regenrate' });
        }
    } catch (err) {
        handleServerError(res, err, 'Failed to verify OTP');
    }
}

module.exports = {
    addOTP,
    verifyOTP
};
