import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updateProfile = async (userData, token) => {
  const res = await axios.put(`${API_URL}/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const changePassword = async (passwordData, token) => {
  const res = await axios.put(`${API_URL}/profile/password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const userService = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
};
export default userService;
