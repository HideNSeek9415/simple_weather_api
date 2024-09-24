import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Filters } from '../redux/actions';
import './TodoList.css';

const TodoList = () => {
  const { todos, filter } = useSelector(state => state);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filters.COMPLETED) return todo.completed;
    if (filter === Filters.INCOMPLETE) return !todo.completed;
    return true;
  });

  return (
    <ul class="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
