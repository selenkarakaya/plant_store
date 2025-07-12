import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/cart";

// Add item to cart

const addToCart = async (product_variant_id, quantity = 1, token) => {
  const response = await axios.post(
    `${API_URL}/add`,
    { product_variant_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get active cart
const getCart = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update item quantity
const updateCartItemQuantity = async (cartItemId, quantity, token) => {
  const response = await axios.patch(
    `${API_URL}/update/${cartItemId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Remove item
const removeItemFromCart = async (cartItemId, token) => {
  const response = await axios.delete(`${API_URL}/remove/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const cartService = {
  addToCart,
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
};

export default cartService;
