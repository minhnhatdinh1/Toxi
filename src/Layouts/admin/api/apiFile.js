import axios from "axios";

const UPLOAD_URL = "http://localhost:8080/api/admin/upload";
const EXPORT_URL = "http://localhost:8080/api/admin/books/export-excel";
const DELETE_IMAGE_BY_BOOK_URL =
  "http://localhost:8080/api/images/delete-by-book";

// ================= UPLOAD IMAGE =================
export const uploadImage = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ================= EXPORT EXCEL =================
export const exportBooksExcel = async () => {
  const token = localStorage.getItem("token");

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
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${DELETE_IMAGE_BY_BOOK_URL}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
