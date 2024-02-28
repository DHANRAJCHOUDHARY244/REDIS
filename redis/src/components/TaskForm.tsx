import React, { useState } from 'react';
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const TaskForm = () => {
    const [taskInput, setTaskInput] = useState({
        title: '',
        description: '',
        link: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addTask = async () => {
        await axios.post('http://localhost:5000/api/tasks', { task: taskInput })
            .then(() => {
                console.log('Task added successfully');
                setTaskInput({
                    title: '',
                    description: '',
                    link: '',
                    date: ''
                });
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Box sx={{ border: '1px solid white', width: '500px', height: '400px', borderRadius: '30px', p: 5 }}>
            <Typography variant='h3'>Add your Todo Task</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    color="secondary"
                    value={taskInput.title}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                />
                <TextField
                    id="link"
                    name="link"
                    label="ImageLink"
                    variant="outlined"
                    color="secondary"
                    value={taskInput.link}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={taskInput.description}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                />
                <Input
                    type='date'
                    name="date"
                    value={taskInput.date}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                />
                <Button variant="contained" endIcon={<SendIcon />} onClick={addTask}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default TaskForm;
