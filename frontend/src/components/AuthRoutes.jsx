import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// 1. PROTECTED ROUTE (For Dashboard, Profile, etc.)
// If no token, redirect to Login. Otherwise, render the child page (Outlet).
export const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Convert to boolean

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// 2. GUEST ROUTE (For Login, Signup)
// If already logged in, redirect to Dashboard. Otherwise, render the child page.
export const GuestRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
