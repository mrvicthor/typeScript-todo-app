import React, { useState } from "react";
import Sun from "../images/icon-sun.svg";
import Moon from "../images/icon-moon.svg";

import InputElement from "./InputElement";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

type Props = {
  toggleTheme: boolean;
  setToggleTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const Todos: React.FC<Props> = ({ toggleTheme, setToggleTheme }) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [complete, setComplete] = useState<Todo[]>([]);

  const handleCreateTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      setTodos(() => [...todos, { id: Date.now(), todo, isDone: false }]);
    }
    setTodo("");
  };

  return (
    <div className="todo">
      <div className="todo__heading">
        <h1>Todo</h1>
        <img
          className="todo__image"
          onClick={() => {
            if (!toggleTheme) {
              document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
            } else {
              document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
            }
            setToggleTheme(!toggleTheme);
          }}
          src={toggleTheme ? Sun : Moon}
          alt="Sun"
        />
      </div>
      <InputElement
        todo={todo}
        setTodo={setTodo}
        createTodo={handleCreateTodo}
        toggleTheme={toggleTheme}
      />
      <TodoItem
        todos={todos}
        toggleTheme={toggleTheme}
        setTodos={setTodos}
        complete={complete}
        setComplete={setComplete}
      />

      <p className={toggleTheme ? "col__dark" : "col__white"}>
        Drag and drop to reorder list
      </p>
    </div>
  );
};

export default Todos;
