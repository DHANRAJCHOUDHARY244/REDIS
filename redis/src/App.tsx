import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
 const fetchData=async()=>{
    await axios.get('http://localhost:5000/api/tasks')
    .then(res => {
        setTasks(res.data);
    })
    .catch(err => {
        console.error(err);
    });
 }
    useEffect(() => {
        fetchData()
    }, []);

    const addTask = async() => {
       await axios.post('http://localhost:5000/api/tasks', { task: taskInput })
            .then(() => {
                setTasks([...tasks, taskInput]);
                setTaskInput('');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const deleteTask = async(id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task !== id));
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            <h1>TODO App</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks && tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => deleteTask(task)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
