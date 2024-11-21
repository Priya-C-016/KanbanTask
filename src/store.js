import { configureStore, createSlice } from "@reduxjs/toolkit";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    tasks: {
      todo: [],
      inProgress: [],
      done: [],
    },
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.todo.push(action.payload); 
    },
    moveToInProgress: (state, action) => {
      const taskIndex = state.tasks.todo.indexOf(action.payload);
      if (taskIndex > -1) {
        state.tasks.todo.splice(taskIndex, 1);
        state.tasks.inProgress.push(action.payload);
      }
    },
    moveToDone: (state, action) => {
      const taskIndex = state.tasks.inProgress.indexOf(action.payload);
      if (taskIndex > -1) {
        state.tasks.inProgress.splice(taskIndex, 1);
        state.tasks.done.push(action.payload);
      }
    },
    resetTasks: (state) => {
      state.tasks = { todo: [], inProgress: [], done: [] };
    },
  },
});

export const { addTask, moveToInProgress, moveToDone, resetTasks } = kanbanSlice.actions;

const store = configureStore({
  reducer: {
    kanban: kanbanSlice.reducer,
  },
});

export default store;
