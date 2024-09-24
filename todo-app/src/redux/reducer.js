import { ADD_TODO, TOGGLE_TODO, SET_FILTER, Filters, REMOVE_TODO } from './actions';

const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const initialState = {
  todos: [],
  filter: Filters.ALL
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: generateRandomId(),
        content: action.payload.content,
        completed: false
      };
      return { ...state, todos: [newTodo, ...state.todos] };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        )
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo =>
          todo.id !== action.payload.id
        )
      };

    case SET_FILTER:
      return { ...state, filter: action.payload.filter };

    default:
      return state;
  }
}

export default todoReducer;
