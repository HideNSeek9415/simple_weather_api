import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <AddTodo />
      <TodoFilter />
      <TodoList />
    </div>
  );
};

export default App;
