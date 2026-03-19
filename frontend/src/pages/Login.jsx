import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //handle login with google
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  //handle login with email and password
  const handleEmailLogin = async () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">
      {/* phone / app container */}
      <div
        className="
          relative
          w-full max-w-[390px]
          h-screen
          bg-[#FFFBEA]
          shadow-none sm:shadow-xl
          px-6 pt-8 pb-8
          flex flex-col
          overflow-hidden
        "
      >
        {/* back arrow */}
        <Link to="/" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div>
          <h1 className="mt-12 text-5xl sm:text-5xl font-bold text-[#4969B2]">
            Login
          </h1>
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

            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Username"
                className="
                  w-full px-3 py-3 outline-none bg-transparent
                  placeholder:text-[#9DB2E3] placeholder:font-normal
                "
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Lock size={16} />
              Password
            </label>

            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="
                  w-full px-3 py-3 outline-none bg-transparent
                  placeholder:text-[#9DB2E3] placeholder:font-normal
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-[#4969B2]" />
                ) : (
                  <Eye size={18} className="text-[#4969B2]" />
                )}
              </button>
            </div>
          </div>

          {/* forgot password */}
          <div className="mt-2 text-left">
            <Link
              to="/reset-password"
              className="underline text-sm font-medium text-[#7C95CF] hover:text-[#4969B2] transition"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* login button */}
        <button
          onClick={handleEmailLogin}
          className="
            mt-6 sm:mt-8 w-full
            bg-[#4969B2] text-white
            py-3 sm:py-4
            rounded-2xl font-bold
            hover:bg-[#3E5FA3] transition
          "
        >
          Login
        </button>

        {/* divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#4969B2]" />
          <span className="px-3 text-sm font-medium text-[#4969B2]">or continue with</span>
          <div className="flex-1 h-px bg-[#4969B2]" />
        </div>

        {/* google button */}
        <button
          onClick={handleGoogleLogin}
          className="
            w-full border-2 border-black
            bg-white py-3 sm:py-4
            rounded-2xl
            flex items-center justify-center gap-3
            hover:bg-gray-100 transition
          "
        >
          <img src="/googleicon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Login with Google</span>
        </button>

        {/* register */}
        <p className="mt-6 text-center text-sm font-medium text-[#7C95CF]">
          Not have account yet?{" "}
          <Link
            to="/register"
            className="underline font-semibold text-[#F49A5E] hover:text-[#FC812E] transition"
          >
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
}
