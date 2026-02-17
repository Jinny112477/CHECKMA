import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function AuthRedirect() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // 🚫 NOT LOGGED IN → do nothing
    if (!user) return;

    // ✅ Logged in but no role
    if (!profile?.role) {
      navigate("/role", { replace: true });
      return;
    }

    // ✅ Logged in with role
    if (profile.role === "student") {
      navigate("/student/home", { replace: true });
    }

    if (profile.role === "professor") {
      navigate("/prof/home", { replace: true });
    }

  }, [user, profile, loading]);

  return null;
}
