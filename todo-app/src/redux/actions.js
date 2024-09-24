// Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_FILTER = 'SET_FILTER';

// Action Creators
export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: { content }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter }
});

// Filter Constants
export const Filters = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
};
