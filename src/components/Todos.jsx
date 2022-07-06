import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { addTodo, fetchTodos } from "../features/todos/todosSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  //!!код для того, чтобы не выводилось одно и тоже дело
  const findTodos = todos.find((item) => {
    return inputText === item.text;
  });

  const hendleKeyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      hendleAddition();
    }
  };

  const hendleAddition = () => {
    if (findTodos?.text === inputText) {
      alert("Данная задача уже имеется. Введите новую задачу!");
      return setInputText("");
    }
    //!!условие для того чтобы пустая строка и пробелы не добавлялись
    if (inputText.trim().length) {
      dispatch(addTodo(inputText));
    }
    setInputText("");
  };

  if (error) {
    return <div className="error">error...</div>;
  }
  return (
    <div className="container">
      <div className="header">Todo-List</div>
      <div className="main">
        <input
          className="input"
          type="text"
          placeholder="Create a new todo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => hendleKeyPress(e)}
        />
        <button onClick={hendleAddition} className="add">
          add
        </button>
      </div>
      <div className="footer">
        {todos.map((item, _id) => {
          return <Todo todo={item} key={_id} text={item.text} />;
        })}
      </div>
    </div>
  );
};

export default Todos;
