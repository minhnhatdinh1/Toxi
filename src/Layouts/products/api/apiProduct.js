import axios from "axios";

// ================= BASE URLs =================
const BOOK_API = "http://localhost:8080/api/books";
const CATEGORY_API = "http://localhost:8080/api/categories";

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
