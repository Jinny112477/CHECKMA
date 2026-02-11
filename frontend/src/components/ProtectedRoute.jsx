import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

