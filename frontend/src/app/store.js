// src/app/store.js
// First, we will create the Redux store so that we can manage the global state in the application.

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
