// src/app/store.js
// First, we will create the Redux store so that we can manage the global state in the application.

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/carts/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import popularProductsReducer from "../features/products/popularSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    popularProducts: popularProductsReducer,
  },
});
