import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const AdminProtectedRoute = () => {
  const { user } = useUserStore();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If user is an admin, allow access to protected routes
  if (user.role === "admin") {
    return <Outlet />;
  }

  // If user is logged in but not an admin, redirect to home or an unauthorized page
  return <Navigate to="/" replace />;
};

export default AdminProtectedRoute;
