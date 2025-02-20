import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Sidebar from "./components/SideBar";
import { Navigate } from "react-router-dom";
import AdminNotFound from "./pages/AdminNotFound";
import Ledger from "./pages/Ledger";
import Header from "./components/Header";

const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  const location = useLocation(); // To track the current route
  const [darkMode, setDarkMode] = useState(false);

  // Hide sidebar on login or signup pages
  const hideSidebar =
    location.pathname === "/admin/login" ||
    location.pathname === "/admin/signup";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };
  return (
    <>
      <div className="flex">
        {!hideSidebar && (
          <Sidebar
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
        <div className="w-full flex-grow ">
          <Header darkMode={darkMode} />
          <Routes>
            {/* Public Admin Routes */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<Signup />} />

            {/* Redirect /admin to /admin/dashboard */}
            <Route path="/" element={<Navigate to="dashboard" replace />} />

            {/* Protected Admin Routes */}
            <Route
              element={
                <AdminProtectedRoute isAuthenticated={isAuthenticated} />
              }
            >
              <Route
                path="dashboard"
                element={<Dashboard darkMode={darkMode} />}
              />
              <Route path="ledger" element={<Ledger />} />
              <Route path="listing/:id" element={<Ledger />} />
              <Route path="create-blog" element={<Ledger />} />
              <Route path="blog-list" element={<Ledger />} />
              <Route path="profile/:id" element={<Ledger />} />
            </Route>
            {/* Admin Not Found Route */}
            <Route path="*" element={<AdminNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminRoutes;
