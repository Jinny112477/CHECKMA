import { useEffect, useState } from "react";
import { supabase } from "/supabaseClient";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      // If signed out
      if (!session) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        // 🔹 Sync user with backend (create if not exists)
        await fetch("http://localhost:5000/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        // 🔹 Fetch user profile
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Profile fetch failed:", error.message);
          setLoading(false);
          return;
        }

        setProfile(data);
        setLoading(false);

        // 🔹 Clean OAuth hash (#access_token=...)
        if (window.location.hash.includes("access_token")) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        // 🔹 Redirect logic (simple version)
        if (data?.role) {
          navigate("/student/home", { replace: true });
        } else {
          navigate("/role", { replace: true });
        }

      } catch (err) {
        console.error("Auth flow error:", err);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
