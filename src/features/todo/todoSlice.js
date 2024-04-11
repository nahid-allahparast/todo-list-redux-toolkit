import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todos/postAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        title: payload.title,
        id: Date.now(),
        completed: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAsyncTodos = createAsyncThunk(
  "todos/deleteAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload.id);
      await api.delete(`/todos/${payload.id}`);
      console.log(payload);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const toggleeAsyncTodos = createAsyncThunk(
  "todos/toggleeAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/todos/${payload.id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: "",
  },
  reducers: {
    addTodo: (state = initialState, action) => {
      const newNote = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newNote);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTOdo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })

      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(addAsyncTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
        console.log(action.payload);
      })

      .addCase(deleteAsyncTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== Number(action.payload.id)
        );
      })
      .addCase(toggleeAsyncTodos.fulfilled, (state, action) => {
        const selectedTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        selectedTodo.completed = action.payload.completed;
      });
  },
});

export const { addTodo, toggleTodo, deleteTOdo } = todoSlice.actions;
export default todoSlice.reducer;
