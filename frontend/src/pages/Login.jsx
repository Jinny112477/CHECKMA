import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">

      {/* phone / app container */}
      <div
        className="
          relative
          w-full max-w-[390px]
          min-h-screen sm:min-h-[844px]
          bg-[#FFFBEA]
          rounded-none sm:rounded-[20px]
          shadow-none sm:shadow-xl
          px-6 pt-10
        "
      >

        {/* back arrow */}
        <Link to="/" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div className="sm:mt-15">
          <h1 className="mt-11 text-5xl sm:text-5xl font-bold text-[#4969B2]">
            Login
          </h1>
          <p className="mt-3">
            <span className="text-[#697EAE] font-semibold">
              Welcome back{" "}
            </span>
            <span className="text-[#95A9D7] font-light">
              my friend!
            </span>
          </p>
        </div>

        {/* form box */}
        <div className="mt-7 sm:mt-9 bg-[#FFEB83] rounded-2xl p-4 sm:p-5">

          {/* email */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Mail size={16} />
              Email / Username
            </label>

            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
              <input
                type="email"
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
            className="underline text-sm text-[#718DCC] hover:text-[#4969B2] transition"
          >
            Forgot your password?
          </Link>
          </div>
        </div>

        {/* login button */}
        <button
          className="
            mt-6 sm:mt-8 w-full
            bg-[#4969B2] text-white
            py-3 sm:py-4
            rounded-2xl font-semibold
            hover:bg-[#3E5FA3] transition
          "
        >
          <span className="text-[#FFFFFF]">Login</span>
        </button>

        {/* divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#4969B2]" />
          <span className="px-3 text-sm text-[#4969B2]">
            or continue with
          </span>
          <div className="flex-1 h-px bg-[#4969B2]" />
        </div>

        {/* google button */}
        <button
          className="
            w-full border-2 border-black
            bg-white py-3 sm:py-4
            rounded-2xl
            flex items-center justify-center gap-3
            hover:bg-gray-100 transition
          "
        >
          <img
            src="/googleicon.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">
            Login with Google
          </span>
        </button>

        {/* register */}
        <p className="mt-6 text-center text-sm text-[#718DCC]">
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