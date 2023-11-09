import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    removeAllCompleted: (state) => {
      return state.filter((todo) => !todo.completed);
    },
    toggleTodoCompletion: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, removeAllCompleted, toggleTodoCompletion } = todoSlice.actions;
export default todoSlice.reducer;
