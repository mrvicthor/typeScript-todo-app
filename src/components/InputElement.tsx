import React from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  createTodo: (e: React.FormEvent<EventTarget>) => void;
  toggleTheme: boolean;
}

const InputElement: React.FC<Props> = ({
  todo,
  setTodo,
  createTodo,
  toggleTheme,
}) => {
  return (
    <form
      className={toggleTheme ? "form bg__dark" : "form"}
      onSubmit={(e) => createTodo(e)}
    >
      <input
        className={
          toggleTheme ? "form__textInput bg__dark" : "form__textInput "
        }
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Create a new todo.."
      />
      <button type="submit" className="form__button sr-only"></button>
    </form>
  );
};
export default InputElement;
