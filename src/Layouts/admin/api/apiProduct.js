import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const API_URL = `${BASE_URL}/api/admin/books`;
const FILE_API = `${BASE_URL}/api/files`;
const buildBookImageUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const normalizedValue = value.replace(/^\/+/, "");
  if (normalizedValue.startsWith("api/files/")) {
return `${BASE_URL}/${normalizedValue}`;
  }
  if (normalizedValue.startsWith("files/")) {
  return `${BASE_URL}/api/${normalizedValue}`;
  }
  return `${FILE_API}/${normalizedValue}`;
};

const normalizeBook = (raw = {}) => {
  const normalizedImageUrls = Array.isArray(raw.imageUrls)
    ? raw.imageUrls.map(buildBookImageUrl).filter(Boolean)
    : [];

  const image = buildBookImageUrl(
    normalizedImageUrls[0] ||
      raw.thumbnailUrl ||
      raw.thumbnail ||
      raw.imageUrl ||
      raw.image
  );

  return {
    ...raw,
    id: raw.id || raw.bookId,
    name: raw.name || raw.title || "Sản phẩm",
    category:
      raw.category ||
      raw.categoryName ||
      (Array.isArray(raw.categories)
        ? raw.categories
            .map((item) => item?.nameCategory || item?.name || item)
            .filter(Boolean)
            .join(", ")
        : ""),
    imageUrls: normalizedImageUrls,
    thumbnailUrl: buildBookImageUrl(raw.thumbnailUrl || raw.thumbnail),
    imageUrl: buildBookImageUrl(raw.imageUrl || raw.image),
    image,
  };
};
const getAuthHeader = () => {

const getToken = () => localStorage.getItem("authToken") || localStorage.getItem("token");
return{
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  };
};


// ================= GET ALL (Page) =================
export const getAllProducts = async (page = 0, size = 10) => {
  const response = await axios.get(API_URL, {
    params: { page, size },
    ...getAuthHeader(),
  });
  return (response.data.data.content || []).map(normalizeBook);
};

// ================= GET BY ID =================
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return normalizeBook(response.data);
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
