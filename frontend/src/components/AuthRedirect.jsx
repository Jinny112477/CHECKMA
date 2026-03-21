import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirect() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) return;

    // Logged in : NO ROLE
    if (!profile?.role) {
      navigate("/role", { replace: true });
      return;
    }

    // Logged in : ROLE (professor / student)
    if (profile.role === "student") {
      navigate("/student/home", { replace: true });
    }

    if (profile.role === "professor") {
      navigate("/prof/home", { replace: true });
    }

  }, [user, profile, loading]);

  return null;
}
