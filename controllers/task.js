//  ----------------redis---------------- 
const { redisClient } = require('../utils/redisClient');

//  ----------------Error---------------- 
const { handleServerError, handleNotFoundError } = require('../utils/errorHandler');

async function getAllTasks(req, res) {
    try {
        const tasks = await redisClient.lRange('tasks', 0, -1);
        res.send(tasks || []);
    } catch (err) {
        handleServerError(res, err, 'Failed to get tasks');
    }
}

async function addTask(req, res) {
    try {
        const task = req.body.task;
        if (!task) {
            handleBadRequestError(res, 'Task data is missing');
            return;
        }
        await redisClient.rPush('tasks', JSON.stringify(task));
        res.send('Task added successfully');
    } catch (err) {
        handleServerError(res, err, 'Failed to add task');
    }
}

async function deleteTask(req, res) {
    const id = req.params.id;
    try {
        await redisClient.lRem('tasks', 0, id);
        res.send('Task deleted successfully');
    } catch (err) {
        handleNotFoundError(res, 'Task not found');
    }
}

module.exports = {
    getAllTasks,
    addTask,
    deleteTask
};
