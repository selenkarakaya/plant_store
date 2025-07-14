import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/orders";

// Checkout (place an order)
const checkoutOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/checkout`, orderData, {
    withCredentials: true,
  });
  return response.data;
};

// Get orders belonging to the current user
const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/myorders`, {
    withCredentials: true,
  });
  return response.data;
};

// Fetch detailed order information
const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    withCredentials: true,
  });
  return response.data;
};

const orderService = {
  checkoutOrder,
  getMyOrders,
  getOrderDetails,
};

export default orderService;
