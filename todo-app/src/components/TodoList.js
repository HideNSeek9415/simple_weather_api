// src/components/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/TodoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos.list);  // Lấy danh sách todos từ Redux state
  const dispatch = useDispatch();

  if (todos.length === 0) {
    return <p>Không có công việc nào. Hãy thêm một công việc!</p>;
  }

  return (
    <ul style={styles.list}>
      {todos.map(todo => (
        <li key={todo.id} style={styles.listItem}>
          <span
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              ...styles.todoText,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#000',
              cursor: 'pointer',
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch(removeTodo(todo.id))} style={styles.removeButton}>Xoá</button>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  todoText: {
    flex: 1,
    fontSize: '18px',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default TodoList;
