import React, { useEffect, useState } from "react";
import { Todo } from "../model";
import { Status } from "../model";
import Cross from "../images/icon-cross.svg";
import ListGroup from "./ListGroup";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type Props = {
  todos: Todo[];
  complete: Todo[];
  toggleTheme: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setComplete: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem: React.FC<Props> = ({
  todos,
  toggleTheme,
  setTodos,
  complete,
  setComplete,
}) => {
  const [selected, setSelected] = useState<string>("");
  const toggleIsDone = (todo: Todo) => {
    const markedTodo = [...todos];
    const index = markedTodo.indexOf(todo);
    if (!complete.includes(markedTodo[index])) {
      setComplete(() => [...complete, markedTodo[index]]);
    } else {
      setComplete(() =>
        complete.filter((item) => item.id !== markedTodo[index].id)
      );
    }
    markedTodo[index] = { ...markedTodo[index] };
    markedTodo[index].isDone = !markedTodo[index].isDone;

    setTodos(markedTodo);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSelect = (item: string) => {
    setSelected(() => item);
  };

  const clearCompleted = () => {
    setTodos(() => todos.filter((todo) => todo.isDone !== true));
  };

  let items: any = [
    { id: 1, value: "All" },
    { id: 2, value: "Active" },
    { id: 3, value: "Completed" },
  ];

  const filtered =
    selected === "Active"
      ? todos.filter((item) => item.isDone === false)
      : selected === "Completed"
      ? todos.filter((item) => item.isDone === true)
      : todos;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);
    setTodos(items);
  };
  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo__wrapper">
          {(provided) => (
            <div
              className={
                toggleTheme
                  ? "todo__wrapper bg__dark"
                  : "todo__wrapper bg__white"
              }
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filtered.map((todo, index) => {
                return (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={
                          toggleTheme ? "todo__item bg__dark" : "todo__item"
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <label
                          className="todo__item_check"
                          onClick={() => {
                            toggleIsDone(todo);
                          }}
                        >
                          <input
                            type="radio"
                            className="option__input radio"
                            checked={todo.isDone}
                            onChange={(e) => e.target.checked}
                          />
                        </label>
                        {todo.isDone ? (
                          <div className="line-across">{todo.todo}</div>
                        ) : (
                          <div className="todo__item_todo">{todo.todo}</div>
                        )}

                        <img
                          src={Cross}
                          className="todo__cross"
                          onClick={() => deleteTodo(todo.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div
          className={
            toggleTheme
              ? "todo__wrapper_record bg__dark"
              : "todo__wrapper_record bg__white"
          }
        >
          <div>{filtered.length} items left</div>
          <ListGroup
            toggleTheme={toggleTheme}
            selectedItem={selected}
            onItemSelect={handleSelect}
            items={items}
          />
          <div onClick={clearCompleted}>Clear Completed</div>
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default TodoItem;
