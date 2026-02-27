import axios from "axios";
const API = axios.create({
 baseURL: "http://localhost:8080/api",
});

export const loginApi = (data) => API.post("/auth/login", data);

export const registerApi = (userInfo) => API.post("/auth/register", userInfo);

// Password Reset APIs
export const sendOtpApi = (email) => API.post("/auth/send-otp", { email });

export const verifyOtpApi = (email, otp) => API.post("/auth/verify-otp", { email, otp });

export const resendOtpApi = (email) => API.post("/auth/resend-otp", { email });

export const resetPasswordApi = (email, otp, newPassword) => 
  API.post("/auth/reset-password", { email, otp, newPassword });
