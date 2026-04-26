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
  const [authUserId, setAuthUserId] = useState(null);

  const [username, setUsername] = useState("");
  const [signals, setSignals] = useState([]);

  const navigate = useNavigate();

  const initialSessionChecked = useRef(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // SUPABASE REALTIME RENDERING
  const subscribeToParticipants = (session_id, callback) => {
    const channel = supabase
      .channel(`session_participants:${session_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "session_participants",
          filter: `session_id=eq.${session_id}`,
        },
        (payload) => {
          console.log("📡 Supabase raw event:", payload);
          callback(payload);
        },
      )
      .subscribe((status) => {
        console.log("🔌 Subscription status:", status); // Must say SUBSCRIBED
      });

    return channel;
  };

  const unsubscribe = (channel) => {
    if (channel) supabase.removeChannel(channel);
  };

  // SIGNALS: handler
  const fetchSignals = async (class_id) => {
    try {
      console.log("📡 Fetching signals for class_id:", class_id); // 👈 add this
      const res = await fetch(`${API_URL}/api/attendance/signal/${class_id}`);
      const data = await res.json();
      console.log("📦 Signals response:", data); // 👈 and this

      if (res.ok) {
        setSignals(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const subscribeSignals = (class_id, onNewSignal) => {
    const channel = supabase
      .channel(`attendance-signals-${class_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "attendance_signals",
          // no filter
        },
        (payload) => {
          console.log("📡 INSERT:", payload);
          if (onNewSignal) onNewSignal(payload);
          else fetchSignals(class_id);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "attendance_signals",
          // no filter
        },
        (payload) => {
          console.log("📡 UPDATE:", payload);
          if (payload.new.status === "processed") {
            setSignals((prev) => prev.filter((s) => s.id !== payload.new.id));
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "attendance_signals",
          // no filter
        },
        (payload) => {
          console.log("🗑️ DELETE:", payload);
          if (onNewSignal) onNewSignal(payload);
          else
            setSignals((prev) => prev.filter((s) => s.id !== payload.old.id));
        },
      )
      .subscribe((status) => {
        console.log("🔌 Signals subscription status:", status);
      });

    return channel;
  };

  const unsubscribeSignals = (channel) => {
    if (channel) supabase.removeChannel(channel);
  };

  // SUPABASE AUTHENTICATION
  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      initialSessionChecked.current = true;
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!initialSessionChecked.current) return;

        // ✅ Only handle these specific events, ignore TOKEN_REFRESHED etc.
        if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          setUser(session?.user ?? null);
          if (session?.user) {
            fetchProfile(session);
          }
        }
      },
    );

    // 3. Cleanup listener
    return () => listener.subscription.unsubscribe();
  }, []);

  // FETCH AUTH USER
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAuthUserId(user?.id ?? null);
    });
  }, []);

  // FETCH USER PROFILE: handler
  const fetchProfile = useCallback(async (session) => {
    // ✅ Add this guard
    if (!session?.access_token) {
      console.warn("fetchProfile called with no access_token", session);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
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

  //GOOGLE SIGNUP/LOGIN : handler
  const handleGoogleAuthen = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // LOGIN : handler
  const handleEmailLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return true;
  };

  // SIGNUP : handler
  const handleEmailSignup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
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

  // ROLE SELECT: handler
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

  // SIGN OUT: handler
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/");
    }
  };

  // PROFILE UPDATE: save state
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

      const res = await fetch(`${API_URL}/api/users/profile`, {
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
      redirectTo: `${window.location.origin}/reset/new-password`,
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

  // SET TOKEN SESSION
  const setSessionFromURL = async (accessToken, refrechToken) => {
    return await supabase.auth.setSession({
      access_token: accessToken,
      refrechToken: refrechToken,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authUserId,
        profile,
        setProfile,
        loading,
        subscribeToParticipants,
        signals,
        fetchSignals,
        unsubscribeSignals,
        subscribeSignals,
        unsubscribe,
        handleGoogleAuthen,
        handleEmailLogin,
        handleEmailSignup,
        updateRole,
        handleSignOut,
        updateProfile,
        resetPassword,
        updatePassword,
        setSessionFromURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
