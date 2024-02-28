const express = require('express');
const { check, validationResult } = require('express-validator'); // Added for input validation
const cors = require('cors');

const app = express();
const redis = require("redis");
const redisclient = redis.createClient(); 

(async () => { 
	await redisclient.connect(); 
})(); 


console.log("Connecting to the Redis");

redisclient.on("ready", () => {
    console.log("Connected!");
});

redisclient.on("error", (err) => {
    console.log("Error in the Connection");
});

app.use(express.json());
app.use(cors()); // Cors middleware enabled for all routes

// Improved error handling and input validation
// Get all tasks
redisclient.on("ready", async () => {
    app.get('/api/tasks', async (req, res) => {
        try {
            const tasks = await redisclient.lrange('tasks', 0, -1);
            if (tasks) {
                res.send(tasks);
            } else {
                res.send([]); // Send an empty array if no tasks are found
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

    // Add a task with input validation
    app.post('/api/tasks', check('task').trim().escape().notEmpty(), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const task = req.body.task;
            await redisclient.rpush('tasks', task);
            res.send('Task added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

    // Delete a task
    app.delete('/api/tasks/:id', async (req, res) => {
        const id = req.params.id;

        try {
            await redisclient.lrem('tasks', 0, id);
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
})
