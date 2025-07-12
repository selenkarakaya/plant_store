// src/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/categories";
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL);
      return res.data; // [{ id, name, parent_id }]
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Category fetch failed"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;

/*
This categorySlice is used to asynchronously fetch and manage the list of product categories in a centralized Redux store,
 allowing the entire application to access, track loading states, and handle errors related to category data efficiently.
*/
