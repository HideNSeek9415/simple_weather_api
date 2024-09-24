import { createSlice } from '@reduxjs/toolkit';
import Filters from '../redux/filterType';

// Hàm tạo ID ngẫu nhiên cho mỗi todo
const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Trạng thái khởi tạo cho todos
const initialTodoState = {
  todos: []
};

// Trạng thái khởi tạo cho filter
const initialFilterState = {
  filter: Filters.ALL
};

// Tạo slice cho todos
const todoSlice = createSlice({
  name: 'todos',
  initialState: initialTodoState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: generateRandomId(),
        content: action.payload.content,
        completed: false
      };  
      state.todos.unshift(newTodo); // Thêm todo mới vào đầu mảng
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed; // Chuyển đổi trạng thái hoàn thành
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload); // Xóa todo
    }
  }
});

// Tạo slice cho filter
const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Cập nhật filter
    }
  }
});

// Xuất các action từ todos slice
export const {
  addTodo,
  toggleTodo,
  removeTodo
} = todoSlice.actions;

// Xuất action từ filter slice
export const {
  setFilter
} = filterSlice.actions;

// Xuất reducer cho todos và filter
export const todoReducer = todoSlice.reducer;
export const filterReducer = filterSlice.reducer;
