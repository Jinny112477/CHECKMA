import { useEffect, useRef, useState } from "react";
import { supabase } from "/supabaseClient";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const didSync = useRef(false);

  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      // SIGNED OUT
      if (!session?.user) {
        didSync.current = false;
        setProfile(null);
        setLoading(false);
        return;
      }

      // FIRST SIGN IN → sync backend user
      if (event === "SIGNED_IN" && !didSync.current) {
        didSync.current = true;

        const res = await fetch("http://localhost:5000/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!res.ok) {
          console.error("Sync failed");
        }
      }

      // Fetch profile
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

      if (event === "SIGNED_IN") {
        navigate("/student/home", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ profile, loading, session }}>
      {children}
    </AuthContext.Provider>
  );
}
