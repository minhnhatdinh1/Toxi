import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("authToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export const createLessonApi = (data) => {
  return API.post("/admin/lessons", data);
};

export const createLessonMultipartApi = ({
  lesson,
  videoFile,
  attachmentFile,
}) => {
  const formData = new FormData();
  formData.append(
    "lesson",
    new Blob([JSON.stringify(lesson)], {
      type: "application/json",
    })
  );

  if (videoFile) {
    formData.append("video", videoFile);
  }

  if (attachmentFile) {
    formData.append("attachment", attachmentFile);
  }

  return API.post("/admin/lessons", formData);
};

export const addLessonToChapterApi = (chapterId, lessonId) => {
  return API.post(
    `/admin/course-contents/chapter/${chapterId}/lesson/${lessonId}`
  );
};

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

export const getContentByChapterApi = (chapterId) => {
  return API.get(`/admin/course-contents/chapter/${chapterId}`);
};

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

export const deleteChapterApi = (chapterId) => {
  return API.delete(`/admin/chapters/${chapterId}`);
};
