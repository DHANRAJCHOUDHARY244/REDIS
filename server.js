const express = require('express');
const cors = require('cors');
const redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisclient = redis.createClient();

(async () => { 
    await redisclient.connect();
})();

console.log("Connecting to Redis");

redisclient.on("ready", () => {
    console.log("Connected!");
});

redisclient.on("error", (err) => {
    console.log("Error in the Connection");
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await redisclient.lRange('tasks', 0, -1);
        res.send(tasks || []); // Send an empty array if no tasks are found
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = req.body.task;
        await redisclient.rPush('tasks', JSON.stringify(task));
        res.send('Task added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Add a Otp
app.post('/api/otp', async (req, res) => {
    try {
        const task= req.body.task;
        console.log(task);
        await redisclient.setEx(task.email, 60, task.otpGen)
        console.log('-----------',await redisclient.get(task.email));
        setTimeout(async () => {
            console.log('-----------',await redisclient.ttl(task.email),task.email);
        }, 6000)
        res.send('Task added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Add a verify  Otp
app.post('/api/otp-verify', async (req, res) => {
    try {
        const task= req.body.task;
      const otp= await redisclient.get(task.verEmail)
      if(otp===task.otp){
          console.log('-----------',await redisclient.get(task.verEmail));
          res.json({message:'Otp Verified'})
      }
       else{
        res.json({message:'Error Please verify again'});
       }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        await redisclient.lRem('tasks', 0, id);
        res.send('Task deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
