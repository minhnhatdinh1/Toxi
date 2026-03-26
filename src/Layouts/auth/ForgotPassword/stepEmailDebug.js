import axios from "axios";

const DEBUG_BASE_URL = "http://localhost:8080/api";

export async function testSendOtpRequest(email) {
  const token = localStorage.getItem("token");
  const url = `${DEBUG_BASE_URL}/auth/send-otp`;

  try {
    const response = await axios.post(
      url,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    return {
      ok: true,
      url,
      method: "POST",
      status: response.status,
      data: response.data,
      hasToken: Boolean(token),
      origin: window.location.origin,
    };
  } catch (error) {
    return {
      ok: false,
      url,
      method: "POST",
      status: error?.response?.status ?? null,
      data: error?.response?.data ?? null,
      message: error?.message ?? "Unknown error",
      hasToken: Boolean(token),
      origin: window.location.origin,
    };
  }
}

