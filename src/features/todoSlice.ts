import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../model";
import { RootState } from "../redux/store";

type TodoId = number;

export interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },

    toggleComplete: (state: TodoState, action: PayloadAction<TodoId>) => {
      state.list = state.list.map((item) =>
        item.id === action.payload ? { ...item, isDone: !item.isDone } : item
      );
    },
    deleteTodo: (state: TodoState, action: PayloadAction<TodoId>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    editTodoItem: (state: TodoState, action) => {
      state.list = state.list.map((item) =>
        item.id === action.payload.id
          ? { ...item, todo: action.payload.todo }
          : item
      );
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, editTodoItem } =
  todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.list;
export default todoSlice.reducer;
