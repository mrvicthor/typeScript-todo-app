import React, { useState } from "react";
import "./App.scss";
import Todos from "./components/Todos";

const App = () => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);

  return (
    <div className="App">
      <div className={!toggleTheme ? "grad1" : "grad1_dark"}></div>
      <Todos toggleTheme={toggleTheme} setToggleTheme={setToggleTheme} />
    </div>
  );
};

export default App;
