import API from "../../service/ApiService";

const STORAGE_KEY = "toxi_book_reviews";

const readLocalReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocalReviews = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const normalizePayload = (payload = {}) => ({
  id: payload.id ?? `book-review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  bookId: Number(payload.bookId ?? payload.productId),
  rating: Number(payload.rating || 0),
  content: String(payload.content || "").trim(),
  userName: payload.userName || payload.name || localStorage.getItem("userName") || "Nguoi dung",
  email: payload.email || localStorage.getItem("email") || "",
  status: payload.status || "PENDING",
  adminReply: payload.adminReply || null,
  createdAt: payload.createdAt || new Date().toISOString(),
  updatedAt: payload.updatedAt || new Date().toISOString(),
  repliedAt: payload.repliedAt || null,
});

const mapApiReview = (item = {}) => ({
  id: item.id ?? item.reviewId ?? item.commentId,
  bookId: Number(item.bookId ?? item.productId ?? item.book?.bookId),
  rating: Number(item.rating || 0),
  content: item.content || item.comment || "",
  userName: item.userName || item.name || item.fullName || item.user?.fullName || "Nguoi dung",
  email: item.email || item.user?.email || "",
  status: item.status || "PENDING",
  adminReply: item.adminReply || item.reply || null,
  createdAt: item.createdAt || item.created_at || new Date().toISOString(),
  updatedAt: item.updatedAt || item.updated_at || item.createdAt || new Date().toISOString(),
  repliedAt: item.repliedAt || item.replied_at || null,
});

export const getBookReviews = async (bookId) => {
  try {
    const response = await API.get(`/books/${bookId}/reviews`);
    const payload = Array.isArray(response.data)
      ? response.data
      : response.data?.data || response.data?.content || [];
    return payload.map(mapApiReview);
  } catch {
    return readLocalReviews()
      .filter((item) => Number(item.bookId) === Number(bookId))
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }
};

export const createBookReview = async (payload) => {
  try {
    const response = await API.post("/book-reviews", payload);
    return mapApiReview(response.data?.data || response.data || payload);
  } catch {
    const nextItem = normalizePayload(payload);
    const items = [nextItem, ...readLocalReviews()].slice(0, 200);
    writeLocalReviews(items);
    return nextItem;
  }
};
