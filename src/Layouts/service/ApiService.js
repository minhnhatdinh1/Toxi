import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


// central axios instance for the app.  
// you can add interceptors to attach auth tokens or handle global errors.

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor for auth header
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('accessToken') ||
    localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor - you can handle global errors here
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // optionally transform or log error
    return Promise.reject(err);
  }
);

export default API;
