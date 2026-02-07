import { useEffect } from "react";
import { supabase } from "/supabaseClient";

export default function AuthProvider({ setProfile }) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.log("Error fetching user profile:", error.message);
        return;
      }

      if (data) {
        setProfile(data);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}
