import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const API_URL = `${BASE_URL}/api/admin/categories`;
const getAuthHeader = () => {

const getToken = () => localStorage.getItem("authToken") || localStorage.getItem("token");
return{
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  };
};

const normalizeCategory = (item ={}) => ({
  id: item.id ?? item.categoryId,
  name: item.name?? item.nameCategory ??"",
  ...item,
});

export const getAllCategories = async () =>{
  const response = await axios.get(API_URL, getAuthHeader());
  const raw = response.data?.data || response.data || [];
  return Array.isArray(raw) ? raw.map(normalizeCategory): [];
};
export const createCategories = async (payload) =>{
  const response = await axios.post(API_URL,payload,getAuthHeader());
  return response.data;
}
export const updateCategories = async (id , payload) =>{
const response = await axios.put(`${API_URL}/${id}`,payload, getAuthHeader());
return response.data;
}

export const deleteCategories = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`,getAuthHeader());
  return response.data;
}

