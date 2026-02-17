import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!profile?.role) {
    return <Navigate to="/role" replace />;
  }

  // If we're on /dashboard, redirect based on role
  if (!allowedRole) {
    return profile.role === "student" ? (
      <Navigate to="/student/home" replace />
    ) : (
      <Navigate to="/prof/home" replace />
    );
  }

  // If role mismatch
  if (allowedRole && profile.role !== allowedRole) {
    return profile.role === "student" ? (
      <Navigate to="/student/home" replace />
    ) : (
      <Navigate to="/prof/home" replace />
    );
  }

  return children;
}
