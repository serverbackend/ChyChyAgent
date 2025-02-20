import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  // Temporary hardcoded user object for testing
  const user = { name: "Edeh Chinedu", role: "admin" }; // Change to "user" to test redirect

  // If no user or user is not an admin, redirect to login
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated and authorized, render the requested route
  return <Outlet />;
};

export default AdminProtectedRoute;
