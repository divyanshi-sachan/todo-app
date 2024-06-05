import { createSlice } from '@reduxjs/toolkit';

// Load tasks from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    return [];
  }
};

// Save tasks to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadState(),
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
  },
});

const { reducer, actions } = tasksSlice;
const { addTask, deleteTask, toggleTask, editTask } = actions;

const persistReducer = (state, action) => {
  const newState = reducer(state, action);
  saveState(newState);
  return newState;
};

export { addTask, deleteTask, toggleTask, editTask };
export default persistReducer;
