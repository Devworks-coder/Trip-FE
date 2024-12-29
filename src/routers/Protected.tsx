import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/app-context-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authData = useAuth();
  console.log(authData);

  // Check if user is logged in
  const isLoggedIn = !!authData.authData.user.email; // Modify the condition based on your logic

  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
