import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/cart";

// Add item to cart
const addToCart = (product_variant_id, quantity) => {
  return axios
    .post(
      `${API_URL}/add`,
      { product_variant_id, quantity },
      { withCredentials: true }
    )
    .then((res) => res.data); // sadece data döndür
};

const getCart = () => {
  return axios
    .get(`${API_URL}`, { withCredentials: true })
    .then((res) => res.data); // sadece data döndür
};

const updateCartItemQuantity = (cartItemId, quantity) => {
  return axios
    .patch(
      `${API_URL}/update/${cartItemId}`,
      { quantity },
      { withCredentials: true }
    )
    .then((res) => res.data); // sadece data döndür
};

const removeItemFromCart = (cartItemId) => {
  return axios
    .delete(`${API_URL}/remove/${cartItemId}`, { withCredentials: true })
    .then((res) => res.data); // sadece data döndür
};
const cartService = {
  addToCart,
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
};

export default cartService;
