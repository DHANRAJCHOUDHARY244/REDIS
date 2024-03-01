import  { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data.map(item => JSON.parse(item)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(fetchData, 1000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ overflowY: 'scroll', height: '400px' }}>
      {tasks.map((task, index) => (
        <Card key={index} sx={{ width: '40%', mt: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.date}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteTask(JSON.stringify(task))}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Tasks;
