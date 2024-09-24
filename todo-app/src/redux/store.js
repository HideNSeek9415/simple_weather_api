// import { createStore } from 'redux';
// import todoReducer from './reducer';

// const store = createStore(todoReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { todoReducer, filterReducer } from './slice.js';  // Import reducer từ slice

const store = configureStore({
  reducer: {
    todos: todoReducer,  // Reducer cho todos
    filter: filterReducer // Reducer cho filter
  },
});

export default store;

