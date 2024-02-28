import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import axios from 'axios';
import { Box } from '@mui/material';
const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      const data = res.data.map(item => JSON.parse(item));
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }
  
  React.useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 1000);
  
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);
  


  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <Box sx={{ overflowY: 'scroll', height: '400px' }}>
      {tasks && tasks.map((task, index) => (
        <Card sx={{ width: '600px',mt:2 }}>

          <CardMedia
            sx={{ height: '100px' }}
            image={task.link}
            title="green iguana"
          />
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
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => { deleteTask(JSON.stringify(task)) }}>
              Delete
            </Button>
            <Button variant="outlined" startIcon={<UpgradeIcon />}>Update</Button>
          </CardActions>
        </Card>
      ))}
    </Box>

  )
}
export default Tasks



