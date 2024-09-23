  // src/components/TodoForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/TodoSlice';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({
        id: Date.now().toString(), // Tạo ID dựa trên thời gian hiện tại
        text,
        completed: false,
      }));
      setText('');  // Reset input sau khi thêm
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={styles.formContainer}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Thêm công việc mới"
        style={styles.input}
      />
      <button onClick={handleAddTodo} style={styles.button}>Thêm</button>
    </div>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default TodoForm;
