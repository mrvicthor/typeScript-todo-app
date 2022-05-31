import React, { useState } from "react";
import InputField from "./components/InputField";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { addTodo, selectTodos } from "./features/todoSlice";
import TodoList from "./components/TodoList";
import "./App.css";
import { RootState } from "./redux/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(selectTodos);
  const [todo, setTodo] = useState<string>("");

  const handleAdd = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      dispatch(
        addTodo({
          id: Date.now(),
          todo,
          isDone: false,
        })
      );
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
