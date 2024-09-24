import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
// import { Filters } from '../redux/actions';
import Filters from '../redux/filterType';

import './TodoList.css';

const TodoList = () => {
  // @ts-ignore
  const todos = useSelector((state) => state.todos.todos);  // Lấy todos từ state
  // @ts-ignore
  const filter = useSelector((state) => state.filter.filter);  // Lấy filter từ state

  const filteredTodos = todos.filter(todo => {
    if (filter === Filters.COMPLETED) return todo.completed;
    if (filter === Filters.INCOMPLETE) return !todo.completed;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
