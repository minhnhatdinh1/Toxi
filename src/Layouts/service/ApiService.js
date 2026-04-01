import axios from 'axios';

// central axios instance for the app.  
// you can add interceptors to attach auth tokens or handle global errors.

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
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
