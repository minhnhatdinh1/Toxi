import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const UPLOAD_URL = `${BASE_URL}/api/files/upload`;
const EXPORT_URL = `${BASE_URL}/api/admin/books/export-excel`;
const DELETE_IMAGE_BY_BOOK_URL =
  `${BASE_URL}/api/images/delete-by-book`;

// ================= UPLOAD IMAGE =================
export const uploadImage = async (file) => {
const token = localStorage.getItem("authToken") || localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
     
    },
  });

  return response.data;
};

// ================= EXPORT EXCEL =================
export const exportBooksExcel = async () => {
const token = localStorage.getItem("authToken") || localStorage.getItem("token");


  const response = await axios.get(EXPORT_URL, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= DELETE IMAGE BY BOOK ID =================
export const deleteImagesByBook = async (bookId) => {
const token = localStorage.getItem("authToken") || localStorage.getItem("token");

  const response = await axios.delete(`${DELETE_IMAGE_BY_BOOK_URL}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
