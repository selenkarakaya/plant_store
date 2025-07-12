import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// Sipariş oluştur (checkout)
export const checkout = createAsyncThunk(
  "orders/checkout",
  async (orderData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.userInfo?.token;

      if (!token) throw new Error("No token found");

      return await orderService.checkoutOrder(orderData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Kullanıcının siparişlerini çek
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.userInfo?.token;

      if (!token) throw new Error("No token found");

      return await orderService.getMyOrders(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    status: "idle",
    error: null,
    checkoutStatus: "idle",
    checkoutError: null,
  },
  reducers: {
    clearOrderDetails(state) {
      state.orderDetails = null;
      state.error = null;
    },
    resetCheckoutStatus(state) {
      state.checkoutStatus = "idle";
      state.checkoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkout
      .addCase(checkout.pending, (state) => {
        state.checkoutStatus = "loading";
        state.checkoutError = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkoutStatus = "succeeded";
        // action.payload contains { message, order_id }
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkoutStatus = "failed";
        state.checkoutError = action.payload;
      })

      // fetchMyOrders
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetails, resetCheckoutStatus } = orderSlice.actions;
export default orderSlice.reducer;
