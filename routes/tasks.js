const express = require('express');
const router = express.Router();
const { getAllTasks, addTask, deleteTask } = require('../controllers/task');

router.get('/tasks', getAllTasks);
router.post('/tasks', addTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
