import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = import.meta.env.VITE_API_URL;


const API_BASE = `${BASE_URL}/api/admin`;

const isUsableToken = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded?.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const getToken = () => {
  const adminToken = localStorage.getItem("authToken");
  const defaultToken = localStorage.getItem("token");

  if (isUsableToken(adminToken)) return adminToken;
  if (adminToken && !isUsableToken(adminToken)) localStorage.removeItem("authToken");

  if (isUsableToken(defaultToken)) return defaultToken;
  return null;
};

console.log("TOKEN:", getToken());

const getHeaders = () => {
  const token = getToken();
  console.log("TOKEN USED:", token);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getAxiosConfig = () => ({
  headers: getHeaders(),
});

export const fetchQuizzes = async ({ search, status, hsk, sortBy }) => {
  const config = getAxiosConfig();

  if (search && search.trim() !== "") {
    return axios.get(`${API_BASE}/quizzes/search`, {
      params: { keyword: search },
      ...config,
    });
  }

  if (status) {
    return axios.get(`${API_BASE}/quizzes/status/${status}`, config);
  }

  if (hsk) {
    return axios.get(`${API_BASE}/quizzes/hsk/${hsk}`, config);
  }

  if (sortBy && sortBy !== "newest") {
    return axios.get(`${API_BASE}/quizzes/sorted`, {
      params: { sortBy },
      ...config,
    });
  }

  return axios.get(`${API_BASE}/quizzes`, config);
};

export const fetchQuizStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE}/quizzes/statistics`, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${API_BASE}/quizzes`, quizData, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await axios.put(
      `${API_BASE}/quizzes/${quizId}`,
      quizData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(`${API_BASE}/quizzes/${quizId}`, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const deleteMultipleQuizzes = async (quizIds) => {
  try {
    const response = await axios.delete(`${API_BASE}/quizzes`, {
      data: quizIds,
      ...getAxiosConfig(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting quizzes:", error);
    throw error;
  }
};

export const copyQuiz = async (quizId) => {
  try {
    const response = await axios.post(
      `${API_BASE}/quizzes/${quizId}/copy`,
      {},
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error copying quiz:", error);
    throw error;
  }
};

export const fetchQuizDetail = async (quizId) => {
  try {
    const response = await axios.get(`${API_BASE}/quizzes/${quizId}/edit`, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz detail:", error);
    throw error;
  }
};

export const createQuestion = async (quizId, questionData) => {
  try {
    const response = await axios.post(
      `${API_BASE}/quizzes/${quizId}/questions`,
      questionData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding questions:", {
      status: error.response?.status,
      data: error.response?.data,
      payload: questionData,
    });
    throw error;
  }
};

export const removeQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const response = await axios.delete(
      `${API_BASE}/questions/${quizId}/${questionId}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error removing question:", error);
    throw error;
  }
};

export const reorderQuestions = async (quizId, orderedIds) => {
  try {
    const response = await axios.put(
      `${API_BASE}/quizzes/${quizId}/questions/reorder`,
      { orderedQuestionIds: orderedIds },
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error reordering questions:", error);
    throw error;
  }
};

export const fetchQuestionBank = async (quizId) => {
  try {
    const response = await axios.get(
      `${API_BASE}/quizzes/${quizId}/questions/bank`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question bank:", error);
    throw error;
  }
};

export const fetchQuestionDetail = async (questionId) => {
  try {
    const response = await axios.get(`${API_BASE}/questions/${questionId}`, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching question detail:", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await axios.put(
      `${API_BASE}/questions/${questionId}`,
      questionData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const getErrorMessage = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
  }

  if (error.response?.status === 403) {
    return "Bạn không có quyền truy cập tài nguyên này.";
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.status === 404) {
    return "Không tìm thấy tài nguyên.";
  }

  if (error.response?.status === 400) {
    return "Dữ liệu không hợp lệ.";
  }

  if (error.response?.status === 500) {
    return "Lỗi server nội bộ.";
  }

  if (error.message === "Network Error") {
    return "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối.";
  }

  return error.message || "Lỗi không xác định.";
};

