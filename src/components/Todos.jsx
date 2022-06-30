import React, { useState } from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todoReducer";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  //код для того, чтобы не выводилось одно и тоже дело
  // const findTodos = todos.filter((item) => {
  //   return setInputText === item.text;
  // });

  const hendleKeyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      hendleAddition();
    }
  };

  const hendleAddition = () => {
    if (inputText === "" || inputText === " ") {
      alert("Ошибка в поле ввода!");
      return setInputText("");
    }
    // if (findTodos) {
    //   alert("Данная задача уже имеется. Введите новую задачу!")
    //   return setInputText("")
    // }
    setInputText("");
    dispatch(addTodo(inputText));
  };

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
        <button onClick={(e) => hendleAddition(e)} className="add">
          add
        </button>
      </div>
      <div className="footer">
        {todos.map((item, id) => {
          return <Todo todo={item} key={item.id} text={item.text} id={id} />;
        })}
      </div>
    </div>
  );
};

export default Todos;
