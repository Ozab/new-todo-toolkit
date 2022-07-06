import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: false,
};

//!!Вывод дел с бэкенда
export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/todos");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//!!Добавление новых дел
export const addTodo = createAsyncThunk(
  "todo/add",
  async (inputText, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3030/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          completed: false,
        }),
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//!!Удаление дел
export const removeTodos = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3030/todo/${id}`, {
        method: "DELETE",
      });
      await res.json(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//!!Выделение дел
export const completedTodo = createAsyncThunk(
  "todo/change",
  async (todo, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3030/todos/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //!!Вывод дел с бэкенда
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    //!!Добавление новых дел
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
        state.error = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTodo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    //!!Удаление дел
    builder
      .addCase(removeTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload;
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(removeTodos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeTodos.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    //!!Выделение дел
    builder
      .addCase(completedTodo.fulfilled, (state, action) => {
        state.todos.map((item) => {
          if (item._id === action.payload._id) {
            item.completed = !item.completed;
            return action.payload;
          }
          return item;
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(completedTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(completedTodo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default todosSlice.reducer;
