//  ----------------Import Modules---------------- 
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const otpRoutes = require('./routes/otp');
require('dotenv').config()

//  ----------------Express server---------------- 
const app = express();

//  ----------------Middleware---------------- 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  ----------------Routes setup---------------- 
app.use('/api', taskRoutes);
app.use('/api', otpRoutes);

//  ----------------Listening express server on port 5000---------------- 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
