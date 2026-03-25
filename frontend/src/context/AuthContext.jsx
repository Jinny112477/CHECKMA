import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  let initialSessionChecked = useRef(false);

  // SUPABASE AUTHENTICATION
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      initialSessionChecked.current = true;

      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // prevent duplicate call on first load
        if (!initialSessionChecked.current) return;

        setUser(session?.user ?? null);

        if (session?.user) fetchProfile(session.user.id);
        else {
          setProfile(null);
          setLoading(false);
        }

        console.log("EVENT:", event);
        console.log("SESSION:", session);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // FETCH USER PROFILE: handler
  const fetchProfile = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      if (!session) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, { //"http://localhost:5000/api/users/profile"
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();

      setProfile(data);
    } catch (err) {
      console.error("FETCH PROFILE ERROR:", err);
      setProfile(null);
    }

    setLoading(false);
  }, []);

  //Google Sinup/Login : handler
  const handleGoogleAuthen = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_WEB_URL,
      },
    });
  };

  // LOGIN : handler
  const handleEmailLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/", { replace: true });
  };

  // SIGNUP : handler
  const handleEmailSignup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // Update data to "users" table in supabase
    if (user) {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          username: username,
          provider: "email",
        })
        .eq("id", user.id);

      if (updateError) {
        console.error(updateError);
      }

      navigate("/", { replace: true });
    }
  };

  // Role Select: handler
  const updateRole = async (selectedRole) => {
    if (!user) return { error: "No user" };

    const { error } = await supabase
      .from("users")
      .update({ role: selectedRole })
      .eq("id", user.id);

    if (error) return { error };

    // update context
    setProfile((prev) => ({
      ...prev,
      role: selectedRole,
    }));

    return { error: null };
  };

  // Sign Out: handler
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/");
    }
  };

  // Profile Update: save state
  const updateProfile = async (formData, selectedFile) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      if (!session) return { error: "No session" };

      let avatarUrl = profile?.avatar_url;

      if (selectedFile) {
        avatarUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => resolve(reader.result);
        });
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, { //"http://localhost:5000/api/users/profile"
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          avatar_url: avatarUrl,
          ...formData,
        }),
      });

      const data = await res.json();

      // 🔥 IMPORTANT: update context immediately
      setProfile((prev) => ({
        ...prev,
        ...formData,
        avatar_url: avatarUrl,
      }));

      return { data };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  // RESET PASSWORD: handler
  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/new-password`,
    });
    return { data, error };
  };

  // UPDATE PASSWORD: handler
  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        loading,
        handleGoogleAuthen,
        handleEmailLogin,
        handleEmailSignup,
        updateRole,
        handleSignOut,
        updateProfile,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
