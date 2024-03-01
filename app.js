const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const otpRoutes = require('./routes/otp');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', taskRoutes);
app.use('/api', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
