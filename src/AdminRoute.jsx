import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isValidToken = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded?.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const getAdminToken = () => {
  const adminToken = localStorage.getItem("authToken");
  const defaultToken = localStorage.getItem("token");

  if (isValidToken(adminToken)) return adminToken;
  if (adminToken && !isValidToken(adminToken)) localStorage.removeItem("authToken");

  if (isValidToken(defaultToken)) return defaultToken;
  return null;
};

const AdminRoute = ({ children }) => {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    if (!decoded.role || decoded.role !== "ADMIN") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
