// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,  // Kết hợp slice todos vào store
  },
});

export default store;
