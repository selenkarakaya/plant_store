import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/orders";

// Checkout (sipariş oluşturma)
const checkoutOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/checkout`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Kullanıcının siparişlerini getir
const getMyOrders = async (token) => {
  const response = await axios.get(`${API_URL}/myorders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Detaylı sipariş bilgisi
const getOrderDetails = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const orderService = {
  checkoutOrder,
  getMyOrders,
  getOrderDetails,
};

export default orderService;
