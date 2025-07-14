import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// Checkout (place an order)
export const checkout = createAsyncThunk(
  "orders/checkout",
  async (orderData, thunkAPI) => {
    try {
      return await orderService.checkoutOrder(orderData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Get orders belonging to the current user
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getMyOrders();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Fetch detailed order information
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getOrderDetails(orderId);
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
    detailStatus: "idle",
    detailError: null,
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
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload;
      });
  },
});

export const { clearOrderDetails, resetCheckoutStatus } = orderSlice.actions;
export default orderSlice.reducer;
