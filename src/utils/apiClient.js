const BASE_URL = import.meta.env.VITE_API_URL;
const API = `${BASE_URL}/api`;

/**
 * Fetch có đính kèm Authorization header tự động.
 * Nếu nhận 401/403 → thử refresh token → retry request.
 * Nếu refresh thất bại → redirect về /login.
 */
export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  // FormData không được set Content-Type thủ công (browser tự set boundary)
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${API}${url}`, { ...options, headers });

  // Một số endpoint backend đang trả 403 thay cho 401 khi token hết hạn/không hợp lệ.
  if (res.status === 401 || res.status === 403) {
    const refreshed = await tryRefreshToken();
    if (!refreshed) {
      handleSessionExpired();
      return null;
    }

    // Retry request với token mới
    const newToken = localStorage.getItem("token");
    return fetch(`${API}${url}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}

async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    return true;
  } catch {
    return false;
  }
}

function handleSessionExpired() {
  ["token", "refreshToken", "userId", "userName", "avatarUrl"].forEach(k =>
    localStorage.removeItem(k)
  );
  alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
  window.location.href = "/login";
}
