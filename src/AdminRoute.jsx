import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Không có token → về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Token hết hạn
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    // Không phải ADMIN → về home
    if (!decoded.role || decoded.role !== "ADMIN") {
      return <Navigate to="/" replace />;
    }

    // OK → cho vào admin
    return children;

  } catch (error) {
    // Token lỗi → xóa và về login
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;