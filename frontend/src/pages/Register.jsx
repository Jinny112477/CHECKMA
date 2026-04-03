import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, AtSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//📌📌📌📌📌📌📌📌import { supabase } from "../lib/supabaseClient"; // ← import supabase ตรงๆ เพื่อเช็ค username

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleGoogleAuthen, handleEmailSignup } = useAuth();

  const validate = async () => {
    const newErrors = {};

    // Email
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Username
    if (!username.trim()) {
      newErrors.username = "Please enter a username";
    } else if (username.length < 6) {
      newErrors.username = "Username must be at least 6 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain a-z, 0-9, and _";
    } 
    {/* 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌else {
      // เช็คซ้ำใน Supabase — เปลี่ยน 'profiles' และ 'username' ให้ตรงกับ table ของคุณ
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();
      if (data) newErrors.username = "Username นี้ถูกใช้ไปแล้ว";
    }
    */}

    // Password
    if (!password) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignup = async () => {
    setAuthError("");
    setLoading(true);
    const newErrors = await validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await handleEmailSignup(email, password, username);
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("already registered") || msg.includes("already been registered")) {
        setAuthError("Email นี้ถูกใช้งานแล้ว");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // helpers — clear error เมื่อแก้ไข
  const field = (setter, key) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setAuthError("");
  };

  const inputClass = (key) =>
    `flex items-center bg-white rounded-xl px-3 font-semibold border-2 transition ${
      errors[key] ? "border-red-400" : "border-transparent"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">
      <div className="relative w-full max-w-[390px] h-screen bg-[#FFFBEA]
                      shadow-none sm:shadow-xl px-6 pt-8 pb-8
                      flex flex-col overflow-y-auto">

        <Link to="/" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        <div>
          <h1 className="mt-12 text-5xl font-bold text-[#4969B2]">Register</h1>
          <p className="mt-4">
            <span className="text-[#7C95CF] font-medium">Hello </span>
            <span className="text-[#4969B2] font-medium">new friend!</span>
          </p>
        </div>

        {/* form box */}
        <div className="mt-8 bg-[#FFEB83] rounded-2xl p-4 sm:p-5">

          {/* Email */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Mail size={16} /> Email
            </label>
            <div className={inputClass("email")}>
              <input
                type="email" value={email} onChange={field(setEmail, "email")}
                placeholder="Email"
                className="w-full px-3 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.email}</p>}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <User size={16} /> Username
            </label>
            <div className={inputClass("username")}>
              <AtSign className="text-[#4969B2] shrink-0" size={16} />
              <input
                type="text" value={username} onChange={field(setUsername, "username")}
                placeholder="username"
                className="w-full px-2 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
            </div>
            {errors.username && <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Lock size={16} /> Password
            </label>
            <div className={inputClass("password")}>
              <input
                type={showPassword ? "text" : "password"} value={password}
                onChange={field(setPassword, "password")}
                placeholder="Password"
                className="w-full px-3 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
                {showPassword ? <EyeOff size={18} className="text-[#4969B2]" /> : <Eye size={18} className="text-[#4969B2]" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Lock size={16} /> Confirm Password
            </label>
            <div className={inputClass("confirmPassword")}>
              <input
                type={showConfirmPassword ? "text" : "password"} value={confirmPassword}
                onChange={field(setConfirmPassword, "confirmPassword")}
                placeholder="Confirm password"
                className="w-full px-3 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2">
                {showConfirmPassword ? <EyeOff size={18} className="text-[#4969B2]" /> : <Eye size={18} className="text-[#4969B2]" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* auth error */}
        {authError && (
          <div className="mt-4 bg-red-50 border border-red-300 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-red-500 text-lg">⚠</span>
            <p className="text-red-500 text-sm font-semibold">{authError}</p>
          </div>
        )}

        <button
          onClick={handleSignup} disabled={loading}
          className="mt-6 w-full bg-[#4969B2] text-white py-3 sm:py-4
                     rounded-2xl font-bold hover:bg-[#3E5FA3] transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <div className="flex items-center mt-3 mb-2">
          <div className="flex-1 h-px bg-[#4969B2]" />
          <span className="px-3 text-sm font-medium text-[#4969B2]">or continue with</span>
          <div className="flex-1 h-px bg-[#4969B2]" />
        </div>

        <button
          onClick={handleGoogleAuthen}
          className="mt-3 w-full border-2 border-black bg-white py-3 sm:py-4
                     rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <img src="/googleicon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Sign up with Google</span>
        </button>

        <p className="mt-3 text-center text-sm text-[#7C95CF] font-medium">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold text-[#F49A5E] hover:text-[#FC812E] transition">
            Log in!
          </Link>
        </p>
      </div>
    </div>
  );
}