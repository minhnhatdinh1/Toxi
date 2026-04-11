import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const ADMIN_API = `${BASE_URL}/api/admin/blogs`;
const PUBLIC_API = `${BASE_URL}/api/blogs`;

const getToken = () => localStorage.getItem("authToken") || localStorage.getItem("token");

const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
};

export const buildBlogImageUrl = (value) => {
  if (!value) return "";
  if (typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${BASE_URL}/api/files/${value.replace(/^\/+/, "")}`;
};

export const normalizeBlog = (raw = {}) => {
  const createdAt = raw.publishedAt || raw.publishDate || raw.createdAt || raw.created_at || raw.date || "";
  const content = raw.content || raw.body || raw.articleContent || "";
  const image = buildBlogImageUrl(
    raw.thumbnailUrl ||
      raw.thumbnail ||
      raw.imageUrl ||
      raw.coverImage ||
      raw.image
  );
  const galleryImages = (raw.galleryImages || raw.galleryImageUrls || raw.images || [])
    .filter(Boolean)
    .map(buildBlogImageUrl);

  return {
    id: raw.blogId || raw.id || raw.postId || raw.articleId,
    title: raw.title || raw.name || "Bài viết chưa có tiêu đề",
    category: raw.categoryName || raw.category || raw.topic || "Chưa phân loại",
    author: raw.authorName || raw.author || raw.createdBy || "TOXI",
    authorRole: raw.authorRole || raw.role || "Biên tập viên",
    authorImage: buildBlogImageUrl(raw.authorImage || raw.authorAvatar || raw.avatarUrl || ""),
    status: raw.status || "DRAFT",
    date: createdAt,
    publishedAt: createdAt,
    image,
    galleryImages,
    description: raw.summary || raw.excerpt || raw.description || "",
    content,
    readTime: raw.readTime || `${Math.max(1, Math.ceil(String(content).split(/\s+/).filter(Boolean).length / 220))} phút đọc`,
    raw,
  };
};

export const fetchAdminBlogs = async () => {
  const response = await axios.get(ADMIN_API, getConfig());
  return toList(response.data).map(normalizeBlog);
};

export const fetchAdminBlogById = async (id) => {
  const response = await axios.get(`${ADMIN_API}/${id}`, getConfig());
  return normalizeBlog(response.data?.data || response.data);
};

export const createAdminBlog = async (payload) => {
  const response = await axios.post(ADMIN_API, payload, getConfig());
  return normalizeBlog(response.data?.data || response.data);
};

export const updateAdminBlog = async (id, payload) => {
  const response = await axios.put(`${ADMIN_API}/${id}`, payload, getConfig());
  return normalizeBlog(response.data?.data || response.data);
};

export const deleteAdminBlog = async (id) => {
  const response = await axios.delete(`${ADMIN_API}/${id}`, getConfig());
  return response.data;
};

export const fetchPublishedBlogs = async () => {
  const response = await axios.get(PUBLIC_API);
  return toList(response.data).map(normalizeBlog).filter((item) => item.status === "PUBLISHED" || item.status === "ACTIVE");
};

export const fetchBlogById = async (id) => {
  const response = await axios.get(`${PUBLIC_API}/${id}`);
  return normalizeBlog(response.data?.data || response.data);
};
