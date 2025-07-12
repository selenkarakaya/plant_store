// src/features/products/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

// Async thunk: get all products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Async thunk: retrieve single product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Async thunk: fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await productService.getByCategory(categoryId);
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error fetching category products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selected: null,
    selectedCategoryId: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Product Detail
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Category Products
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategoryId, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
