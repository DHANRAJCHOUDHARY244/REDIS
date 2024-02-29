import emailjs from '@emailjs/browser';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const OTP = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpGen, setOtpGen] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageVisibleotp, setMessageVisibleotp] = useState(false);
  const [error, setError] = useState('');
  const [otperror, setOtpError] = useState('');
const[verEmail,setVerEmail]=useState('')
  const generateOTP = () => {
    const otpGenrate = Math.floor(100000 + Math.random() * 900000);
    setOtpGen(otpGenrate.toString());
    return otpGenrate.toString();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_yfehlke",
        "template_phdttaq",
        form.current,
        {
          publicKey: 'Gq2Lu2fEVTHmYLQyM',
        }
      )
      .then(
        (result) => {
          setMessageVisible(true);
          setError('')
          form.current.reset();
          setTimeout(() => {
            setMessageVisible(false)
          }, 3000)
        },
        (error) => {
          setMessageVisible(false);
          setError(error.text)
          setTimeout(() => {
            setError('')
          }, 3000)
        }
      );
  };



  const SendOtp = async () => {
    generateOTP();
    await axios
      .post('http://localhost:5000/api/otp', {
        task: { otpGen, email }
      })
      .then(() => {
        console.log('Task added successfully');
        setVerEmail(email)
        setEmail('');
        setOtp('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

const VerifyOtp=async()=>{
  await axios
  .post('http://localhost:5000/api/otp-verify', {
    task:{otp,verEmail}
  })
  .then((data) => {
    setOtpError(data.data.message)
    setMessageVisibleotp(true)
    setOtp('')
    setVerEmail('')
  })
  .catch((err) => {
    setOtp('');
    setMessageVisibleotp(false)
    setOtpError(err);
    console.error(err);
  });
};

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '50%' }}><Box sx={{ border: '1px solid white', width: '500px', height: '400px', borderRadius: '30px', p: 5 }}>
        <Typography variant='h3'>Enter Email To recieve Otp</Typography>
        <div  style={{ display: messageVisible ? 'block' : 'none' }}>
                    {messageVisible && <p>Your message was sent successfully.</p>}
                    {error!=='' && <p>{error}</p>}
                </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <TextField
            id="title"
            label="EmailId"
            variant="outlined"
            color="secondary"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            sx={{ width: '100%' }}
          />

          <form ref={form} onSubmit={sendEmail}>
            <input size={40} required placeholder="Your Full Name" type="text" name="otp" value={otpGen} hidden />
            <input id="email" size={40} required placeholder="Your email adress" value={email} type="email" name="email" hidden />
            <Button variant="contained" type='submit' sx={{width:'100%'}} endIcon={<SendIcon />} onClick={SendOtp}>
              Send OTP
            </Button>
          </form>
        </Box>
      </Box></Box>
      <Box sx={{ width: '50%' }}><Box sx={{ border: '1px solid white', width: '500px', height: '400px', borderRadius: '30px', p: 5 }}>
        <Typography variant='h3'>Enter Otp To verify</Typography>
        <div  style={{ display: messageVisibleotp ? 'block' : 'none' }}>
                    {messageVisibleotp && <p>Your message was sent successfully.</p>}
                    {otperror!=='' && <p>{error}</p>}
                </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <TextField
            id="title"
            label="otp"
            variant="outlined"
            color="secondary"
            value={otp}
            onChange={(e) => { setOtp(e.target.value) }}
            sx={{ width: '100%' }}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={VerifyOtp}>
            verify
          </Button>
        </Box>
      </Box></Box>
    </Box>
  );
}

export default OTP
