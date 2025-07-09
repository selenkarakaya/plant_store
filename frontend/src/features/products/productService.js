// src/features/products/productService.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

// Tüm ürünleri getir
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Tek bir ürünü ID'ye göre getir
const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
};

export default productService;
