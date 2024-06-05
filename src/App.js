import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <TaskInput />
        <TaskList />
      </Box>
    </Container>
  );
};

export default App;
