// src/features/products/productService.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

// get all products from API
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// retrieve single product
const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// fetch products by category
const getByCategory = async (categoryId) => {
  const res = await axios.get(`${API_URL}/category/${categoryId}`);
  return res.data;
};

const productService = {
  getProducts,
  getProductById,
  getByCategory,
};

export default productService;
