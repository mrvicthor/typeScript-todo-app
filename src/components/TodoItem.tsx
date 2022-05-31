import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  editTodoItem,
} from "../features/todoSlice";
import "./style.css";

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTodoItem({ id: todo.id, todo: editTodo }));
    // setTodos(
    //   todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    // );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todo__item" onSubmit={(e) => handleEdit(e)}>
      {edit ? (
        <input
          value={editTodo}
          ref={inputRef}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todo__item--text"
        />
      ) : todo.isDone ? (
        <s className="todo__item--text">{todo.todo}</s>
      ) : (
        <span className="todo__item--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon" onClick={() => setEdit(!edit)}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete()}>
          <AiFillDelete />
        </span>
        <span
          className="icon"
          onClick={() => {
            console.log(todo.isDone);
            handleDone();
          }}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
