import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../redux/actions';
import { setFilter } from '../redux/slice';
import Filters from '../redux/filterType';
import './TodoFilter.css';

const TodoFilter = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const filter = useSelector((state) => state.filter.filter);  // Lấy filter từ state

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
