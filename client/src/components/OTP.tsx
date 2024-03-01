import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const OTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp', { task: { email } });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);  
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp-verify', { task: { otp, email } });
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Box sx={{ border: '1px solid white', width: '500px', height: '300px', borderRadius: '30px', p: 5 }}>
          <Typography variant='h3'>Enter Email To receive OTP</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <TextField id="email" label="Email" variant="outlined" color="secondary" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '100%' }} />
            <Button variant="contained" type='submit' sx={{ width: '100%' }} endIcon={<SendIcon />} onClick={sendOtp}>
              Send OTP
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ border: '1px solid white', width: '500px', height: '300px', borderRadius: '30px', p: 5 }}>
          <Typography variant='h3'>Enter OTP To verify</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <TextField id="otp" label="OTP" variant="outlined" color="secondary" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ width: '100%' }} />
            <Button variant="contained" endIcon={<SendIcon />} onClick={verifyOtp}>
              Verify
            </Button>
          </Box>
        </Box>
      </Grid>
      {message && (
        <Typography variant='h5' color="white" sx={{ display: 'block', width: '50%', borderRadius: '20px', p: 2, textAlign: 'center', mt: 5, backgroundColor: 'green' }}>
          Response:- {message}
        </Typography>
      )}
    </Grid>
  );
};

export default OTP;
