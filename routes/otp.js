const express = require('express');
const router = express.Router();
const { addOTP, verifyOTP } = require('../controllers/otp');

router.post('/otp', addOTP);
router.post('/otp-verify', verifyOTP);

module.exports = router;
