import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch } from 'react-redux';
import { del, favor } from '../features/todoReducer';

const Todo = ({todo, text, id}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch("")

  const hendleChek = (id) => {
    dispatch(favor(id))
  }

  const hendleDelete = (id) => {
    dispatch(del(id))
  }

    return (
        <div className="cell">
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        onClick={() => hendleChek(id)}
      />
      <div className={`todo ${todo.favorite ? 'textFavorite' : ''}`}>{text}</div>
      <IconButton sx={{ color: 'red' }} aria-label="delete" size="large">
        <DeleteIcon onClick={() => hendleDelete(id)} />
      </IconButton>
    </div>
    );
};

export default Todo;