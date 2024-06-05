import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../redux/tasksSlice';
import { List, ListItem, ListItemText, Checkbox, IconButton, TextField, Button, Box } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleSave = (task) => {
    dispatch(editTask({ id: task.id, text: editText }));
    setEditId(null);
    setEditText('');
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
            sx={{ mr: 2 }}
          />
          {editId === task.id ? (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <TextField 
                variant="outlined"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                sx={{ mr: 2 }}
                fullWidth
              />
              <Button onClick={() => handleSave(task)} variant="contained" color="primary" startIcon={<SaveIcon />}>
                Save
              </Button>
            </Box>
          ) : (
            <>
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flexGrow: 1,
                  cursor: 'pointer',
                }}
                onClick={() => dispatch(toggleTask(task.id))}
              />
              <IconButton onClick={() => handleEdit(task)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(deleteTask(task.id))} color="secondary">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
