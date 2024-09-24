import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, Filters } from '../redux/actions';
import './TodoFilter.css';

const TodoFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  return (
    <div className="todo-filter">
      <button
        onClick={() => dispatch(setFilter(Filters.ALL))}
        className={filter === Filters.ALL ? 'active' : ''}
      >
        Tất cả
      </button>
      <button
        onClick={() => dispatch(setFilter(Filters.COMPLETED))}
        className={filter === Filters.COMPLETED ? 'active' : ''}
      >
        Hoàn thành
      </button>
      <button
        onClick={() => dispatch(setFilter(Filters.INCOMPLETE))}
        className={filter === Filters.INCOMPLETE ? 'active' : ''}
      >
        Chưa hoàn thành
      </button>
    </div>
  );
};

export default TodoFilter;
