import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const API_URL = `${BASE_URL}/api/categories`;

export const getAllCategories = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
