import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      text: "Сидек не пришел",
      favorite: false,
      id: 0,
    },
    {
      text: "Расул обедает",
      favorite: false,
      id: 1,
    },
    {
      text: "Ибрагим постригся",
      favorite: false,
      id: 2,
    },
  ],
};

export const addTodo = createAction("addTodo");
export const favor = createAction("favor");
export const del = createAction("del");

export const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.todos.unshift({
        text: action.payload,
        favorite: false,
        id: new Date(),
      });
    })
    .addCase(favor, (state, action) => {
      state.todos.map((item, id) => {
        if (id === action.payload) {
          item.favorite = !item.favorite;
          return item;
        }
        return item;
      });
    })
    .addCase(del, (state, action) => {
      state.todos = state.todos.filter((item, id) => {
            if (id === action.payload) {
              return false;
            }
            return true;
          })
    });
});
