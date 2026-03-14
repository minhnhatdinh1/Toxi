import axios from "axios";

const API_URL = "http://localhost:8080/api/admin/books";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ================= GET ALL (Page) =================
export const getAllProducts = async (page = 0, size = 10) => {
  const response = await axios.get(API_URL, {
    params: { page, size },
    ...getAuthHeader(),
  });
  return response.data.data.content;
};

// ================= GET BY ID =================
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

// ================= CREATE =================
export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product, getAuthHeader());
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    getAuthHeader(),
  );
  return response.data;
};

// ================= DELETE =================
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};