import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Todo({ complete, text, handleDelete }) {
  const [done, setDone] = useState(complete);
  const [todo, setTodo] = useState(text);
  const [editing, setEditing] = useState(false);
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={done}
        onChange={() => {
          setDone(!done);
        }}
      />
      <input
        type="text"
        value={todo}
        className={[
          `${editing ? "editing" : "not-editing"}`,
          `${done ? "complete" : "incomplete"}`
        ].join(" ")}
        onChange={event => {
          setTodo(event.target.value);
        }}
        onFocus={() => void setEditing(true)}
        onBlur={() => void setEditing(false)}
      />
      <button onClick={() => void handleDelete()}>&#215;</button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { complete: false, text: "Do things now!" },
    { complete: false, text: "Do things later!" },
    { complete: false, text: "Do things finally!" }
  ]);

  function handleDelete(i) {
    setTodos([...todos.slice(0, i), ...todos.slice(i + 1)]);
  }

  return (
    <div className="todos">
      <h1>Todos!</h1>
      <div className="todos-list">
        {todos.map((todo, i) => (
          <Todo
            key={todo.text + i}
            text={todo.text}
            complete={todo.complete}
            handleDelete={() => void handleDelete(i)}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setTodos([
            ...todos,
            { complete: false, text: "Todo!", isediting: true }
          ]);
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
