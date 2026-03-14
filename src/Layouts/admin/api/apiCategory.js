import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

export const getAllCategories = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};