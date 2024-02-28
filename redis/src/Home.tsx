import { Box } from '@mui/material'
import React from 'react'
import TaskForm from './components/TaskForm'
import Tasks from './components/Tasks'

const Home = () => {
    return (
        <Box sx={{ display: 'flex',pt:2,height:'500px',overflow:'hidden' }}>
            <Box sx={{ width: '50%' }}>
                <TaskForm />
            </Box>
            <Box sx={{ width: '50%',pt:5 }}>
                <Tasks />
            </Box>
        </Box>
    )
}

export default Home
