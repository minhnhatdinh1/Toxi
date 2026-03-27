import axios from "axios";

const API_BASE = "http://localhost:8080/api/admin/users";
const AUTH_REGISTER_API = "http://localhost:8080/api/auth/register";

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
  return [];
};

const toData = (payload) => payload?.data ?? payload;

export const normalizeStudent = (raw = {}) => ({
  id: raw.userId ?? raw.id,
  username: raw.username || raw.userName || "",
  name: raw.fullName || raw.username || raw.userName || "Học viên",
  avatar:
    raw.avatarUrl ||
    `https://ui-avatars.com/api/?background=1F2F8C&color=fff&name=${encodeURIComponent(
      raw.fullName || raw.username || "HV"
    )}`,
  email: raw.email || "",
  phone: raw.phone || "",
  roleName: raw.roleName || "USER",
  status:
    raw.status === false || raw.status === 0
      ? "Inactive"
      : "Active",
  courseCount: Number(raw.courseCount || 0),
  orderCount: Number(raw.orderCount || 0),
  createdAt: raw.createdAt || "",
});

export const fetchAdminStudents = async () => {
  const response = await axios.get(API_BASE, getConfig());
  return toList(response.data).map(normalizeStudent);
};

export const fetchAdminStudentStatistics = async () => {
  const response = await axios.get(`${API_BASE}/statistics`, getConfig());
  return toData(response.data);
};

export const fetchAdminStudentById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`, getConfig());
  return normalizeStudent(toData(response.data));
};

export const createAdminStudent = async (payload) => {
  const normalizedPayload = {
    username: payload.username || payload.userName || "",
    userName: payload.userName || payload.username || "",
    fullName: payload.fullName || "",
    email: payload.email || "",
    phone: payload.phone || "",
    address: payload.address || "",
    password: payload.password || payload.passWord || "",
    passWord: payload.passWord || payload.password || "",
    confirmPassword:
      payload.confirmPassword || payload.password || payload.passWord || "",
    status: payload.status ?? true,
    roleName: payload.roleName || "USER",
    role: payload.role || "USER",
  };

  try {
    const response = await axios.post(API_BASE, normalizedPayload, getConfig());
    return normalizeStudent(toData(response.data));
  } catch (error) {
    const status = error?.response?.status;
    if (![403, 404, 405].includes(status)) {
      throw error;
    }

    const fallbackPayload = {
      userName: normalizedPayload.userName,
      passWord: normalizedPayload.passWord,
      confirmPassword: normalizedPayload.confirmPassword,
      fullName: normalizedPayload.fullName,
      email: normalizedPayload.email,
      phone: normalizedPayload.phone,
    };

    const response = await axios.post(AUTH_REGISTER_API, fallbackPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return normalizeStudent({
      ...fallbackPayload,
      status: normalizedPayload.status,
      roleName: "USER",
      ...(toData(response.data) || {}),
    });
  }
};

export const updateAdminStudent = async (id, payload) => {
  const response = await axios.put(`${API_BASE}/${id}`, payload, getConfig());
  return normalizeStudent(toData(response.data));
};

export const deleteAdminStudent = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`, getConfig());
  return response.data;
};

export const updateAdminStudentStatus = async (id, active) => {
  const response = await axios.patch(
    `${API_BASE}/${id}/status`,
    null,
    {
      ...getConfig(),
      params: { active },
    }
  );
  return normalizeStudent(toData(response.data));
};
