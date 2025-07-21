import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

// fetch products by popular
export const fetchPopularProducts = createAsyncThunk(
  "products/fetchPopular",
  async () => {
    const res = await axios.get(`${API_URL}/popular`);
    return Array.isArray(res.data) ? res.data : [];
  }
);

const popularSlice = createSlice({
  name: "popularProducts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default popularSlice.reducer;
