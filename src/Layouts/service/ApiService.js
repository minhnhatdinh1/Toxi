import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const register = (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};