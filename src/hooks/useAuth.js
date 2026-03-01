import { useState, useEffect } from "react";

// simple JWT parser (client-side only, no signature check)
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse JWT", e);
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (role) {
      setUser({ role });
    } else if (token) {
      const decoded = parseJwt(token);
      if (decoded) {
        setUser(decoded);
      }
    }
  }, []);

  return { user };
}
