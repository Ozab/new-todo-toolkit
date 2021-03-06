import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { completedTodo, removeTodos } from "../features/todos/todosSlice";

const Todo = ({ todo, text }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const hendleChek = (todo) => {
    dispatch(completedTodo(todo));
  };

  const handleDelete = () => {
    dispatch(removeTodos(todo._id));
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loader">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cell">
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={() => hendleChek(todo)}
        checked={todo.completed}
      />
      <div className={`todo ${todo.completed ? "textFavorite" : "main-input"}`}>
        {text}
      </div>
      <IconButton
        sx={{ color: "red" }}
        aria-label="delete"
        onClick={handleDelete}
        size="large"
        disabled={todo.deleting}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default Todo;
