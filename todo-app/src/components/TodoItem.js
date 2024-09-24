import React from 'react';
import { useDispatch } from 'react-redux';
// import { removeTodo, toggleTodo } from '../redux/actions';
import { removeTodo, toggleTodo } from '../redux/slice';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  }

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={handleToggle}
    >
      <div>
        {todo.content}
      </div>
      <button className="delete-btn" onClick={handleDelete}>Xóa</button>
    </li>
  );
};

export default TodoItem;
