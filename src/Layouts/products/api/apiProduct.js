import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


// ================= BASE URLs =================
const BOOK_API = `${BASE_URL}/api/books`;
const CATEGORY_API = `${BASE_URL}/api/categories`;

// ================= AXIOS INSTANCES =================
const bookApi = axios.create({
  baseURL: BOOK_API,
  headers: {
    "Content-Type": "application/json",
      
  },
   
});

const categoryApi = axios.create({
  baseURL: CATEGORY_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= BOOK APIs =================
export const getHomeBooks = async () => {
  const response = await bookApi.get("/home");
  return response.data;
};

export const getBookDetail = async (id) => {
  const response = await bookApi.get(`/${id}`);
  return response.data;
};

// ================= CATEGORY APIs =================
export const getAllCategories = async () => {
  const response = await categoryApi.get("");
  return response.data;
};
