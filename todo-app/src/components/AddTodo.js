import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import './AddTodo.css';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const inputElement = useRef()

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
      inputElement.current.focus()
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
      inputElement.current.focus()
    }
  }

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className="add-todo">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Thêm công việc..."
        className="input-todo"
        onKeyDown={handleKeyDown}
        ref={inputElement}
      />
      <button onClick={handleAddTodo} className="btn-add">Thêm</button>
    </div>
  );
};

export default AddTodo;
