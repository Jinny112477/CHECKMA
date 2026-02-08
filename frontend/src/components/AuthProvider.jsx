import { useEffect, useRef, useState } from "react";
import { supabase } from "/supabaseClient";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const didSync = useRef(false);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // signed out
      if (!session?.user) {
        didSync.current = false;
        setProfile(null);
        setLoading(false);
        //navigate("/");
        return;
      }

      // first sign in → sync user
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

      // fetch profile
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
      navigate("/student/home");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
