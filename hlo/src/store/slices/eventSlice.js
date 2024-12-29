import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/event";

// Add data action
export const addData = createAsyncThunk(
    "/todo/create", 
    async (newNote, { rejectWithValue }) => {
      try {
        console.log("note", newNote);
        const response = await axios.post(`${API_URL}/create`, newNote);
        return response.data.data;
      } catch (error) {
        console.error("Error adding note:", error);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Get data action
export const getData = createAsyncThunk("/todos/fetch", async () => {
    const response = await axios.get(`${API_URL}/fetch`);
    console.log("response",response);
    return response.data.data;
});

// Delete data action
export const deleteData = createAsyncThunk("/todos/delete", async (id) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    console.log(response);
    return id;
});

// Update data action
export const updateData = createAsyncThunk("/todos/update", async ({ id, updateNote }) => {
    const response = await axios.put(`${API_URL}/update/${id}`, updateNote);
    return response.data.data; // Return the updated note
});

const initialState = {
  todos: [], // The state should be "todos" since you're working with todo actions
  status: "idle",
   // Add a status property to track loading state
};

const eventSlice = createSlice({
  name: "events", // Name of the slice
  initialState, // Initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add data
      .addCase(addData.fulfilled, (state, action) => {
        state.todos.push(action.payload); // Add the new todo to the state
      })
      // Get data
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mark as succeeded after fetching
        state.todos = action.payload; // Store fetched todos
      })
      // Delete data
      .addCase(deleteData.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload); // Remove the deleted todo
      })
      // Update data
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload; // Update the todo at the found index
        }
      });
  },
});

export default eventSlice.reducer;
