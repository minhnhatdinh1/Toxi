import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// gắn token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  console.log("TOKEN SEND:", token); // 🔥 THÊM DÒNG NÀY
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    config.headers["Content-Type"] = "application/json"; // 🔥 THÊM DÒNG NÀY
  return config;
});

// ================== LESSON ==================

// tạo lesson (video)
export const createLessonApi = (data) => {
  return API.post("/admin/lessons", data);
};

// ================== COURSE CONTENT ==================

// add lesson vào chapter
export const addLessonToChapterApi = (chapterId, lessonId) => {
  return API.post(
    `/admin/course-contents/chapter/${chapterId}/lesson/${lessonId}`
  );
};
// add quiz vào chapter
export const addQuizToChapterApi = (chapterId, quizId) => {
  const payload = {
    chapterId,
    quizId,
  };

  return API.post("/admin/course-contents/quiz", payload).catch(async (error) => {
    console.error("ADD QUIZ PRIMARY ENDPOINT ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
      payload,
    });

    // Fallback to a lesson-like route shape in case the backend maps quiz addition by path params.
    return API.post(`/admin/course-contents/chapter/${chapterId}/quiz/${quizId}`).catch((fallbackError) => {
      console.error("ADD QUIZ FALLBACK ENDPOINT ERROR:", {
        status: fallbackError.response?.status,
        data: fallbackError.response?.data,
        payload,
      });
      throw fallbackError;
    });
  });
};

// lấy danh sách content theo chapter
export const getContentByChapterApi = (chapterId) => {
  return API.get(`/admin/course-contents/chapter/${chapterId}`);
};

// xoá content
export const deleteContentApi = (contentId) => {
  return API.delete(`/admin/course-contents/${contentId}`);
};
export const fetchChaptersApi = (courseId) => {
  return API.get(`/admin/chapters/course/${courseId}`);
};
export const createChapterApi = (courseId, data) =>
  API.post(`/admin/chapters/course/${courseId}`, data);
export const updateLessonApi = (lessonId, data) => {
  return API.put(`/admin/lessons/${lessonId}`, data);
};
export const updateChapterApi = (chapterId, data) => {
  return API.put(`/admin/chapters/${chapterId}`, data);
};
export const updateQuizApi = (quizId, data) => {
  return API.put(`/admin/quizzes/${quizId}`, data);
};
// ✅ THÊM CÁI NÀY
export const deleteChapterApi = (chapterId) => {
  return API.delete(`/admin/chapters/${chapterId}`);
};
