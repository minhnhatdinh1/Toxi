import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },  
  };
};

export const getAllCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};  

export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCourse = async (course) => {
  const response = await axios.post(API_URL, course, getAuthHeader());
  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await axios.put(`${API_URL}/${id}`, course, getAuthHeader());
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};
