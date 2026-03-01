import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },  
  };
};

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};  

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product, getAuthHeader());
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product, getAuthHeader());
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

export const searchProducts = async (keyword) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: keyword }
  });
  return response.data;
};
