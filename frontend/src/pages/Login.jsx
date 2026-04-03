import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleGoogleAuthen, handleEmailLogin } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Please enter the email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Please enter the password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleLogin = async () => {
    setAuthError("");
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await handleEmailLogin(email, password);
    } catch (err) {
      // ปรับ error message ตาม Supabase error code
      const code = err?.message || "";
      if (
        code.includes("invalid_credentials") ||
        code.includes("Invalid login") ||
        code.includes("wrong-password") ||
        code.includes("user-not-found")
      ) {
        setAuthError("Wrong password or username. Please try again.");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // clear error เมื่อผู้ใช้แก้ไข
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
    setAuthError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
    setAuthError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">
      <div className="relative w-full max-w-[390px] h-screen bg-[#FFFBEA]
                      shadow-none sm:shadow-xl px-6 pt-8 pb-8
                      flex flex-col overflow-hidden">

        <Link to="/" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        <div>
          <h1 className="mt-12 text-5xl font-bold text-[#4969B2]">Login</h1>
          <p className="mt-4">
            <span className="text-[#4969B2] font-medium">Welcome back </span>
            <span className="text-[#7C95CF] font-medium">my friend!</span>
          </p>
        </div>

        {/* form box */}
        <div className="mt-8 bg-[#FFEB83] rounded-2xl p-4 sm:p-5">

          {/* email */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Mail size={16} />
              Email / Username
            </label>
            <div className={`flex items-center bg-white rounded-xl px-3 font-semibold
                            border-2 transition
                            ${errors.email ? "border-red-400" : "border-transparent"}`}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email or Username"
                className="w-full px-3 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.email}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Lock size={16} />
              Password
            </label>
            <div className={`flex items-center bg-white rounded-xl px-3 font-semibold
                            border-2 transition
                            ${errors.password ? "border-red-400" : "border-transparent"}`}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full px-3 py-3 outline-none bg-transparent
                           placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
                {showPassword
                  ? <EyeOff size={18} className="text-[#4969B2]" />
                  : <Eye size={18} className="text-[#4969B2]" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 font-medium pl-1">{errors.password}</p>
            )}
          </div>

          <div className="mt-2 text-left">
            <Link to="/reset-password"
              className="underline text-sm font-medium text-[#7C95CF] hover:text-[#4969B2] transition">
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* auth error (wrong password / username) */}
        {authError && (
          <div className="mt-4 bg-red-50 border border-red-300 rounded-xl px-4 py-3
                          flex items-center gap-2">
            <span className="text-red-500 text-lg">⚠</span>
            <p className="text-red-500 text-sm font-semibold">{authError}</p>
          </div>
        )}

        {/* login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 sm:mt-8 w-full bg-[#4969B2] text-white
                     py-3 sm:py-4 rounded-2xl font-bold
                     hover:bg-[#3E5FA3] transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#4969B2]" />
          <span className="px-3 text-sm font-medium text-[#4969B2]">or continue with</span>
          <div className="flex-1 h-px bg-[#4969B2]" />
        </div>

        <button
          onClick={handleGoogleAuthen}
          className="w-full border-2 border-black bg-white py-3 sm:py-4
                     rounded-2xl flex items-center justify-center gap-3
                     hover:bg-gray-100 transition"
        >
          <img src="/googleicon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Login with Google</span>
        </button>

        <p className="mt-6 text-center text-sm font-medium text-[#7C95CF]">
          Not have account yet?{" "}
          <Link to="/register"
            className="underline font-semibold text-[#F49A5E] hover:text-[#FC812E] transition">
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
}