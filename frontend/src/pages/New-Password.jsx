import React, { useState, useEffect } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  const { updatePassword, setSessionFromUrl } = useAuth();
  const navigate = useNavigate();

  // Access/Refresh Token
  useEffect(() => {
    const run = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await setSessionFromUrl(accessToken, refreshToken);

        if (error) {
          setError("Invalid or expired reset link");
        }
      }
    };

    run();
  }, [searchParams]);

  // Submit new Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    if (password.length < 10) {
      setError("password must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await updatePassword(password);

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password updated successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
        <Link to="/login" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div className="mt-12">
          <h1 className="text-5xl font-bold text-[#4969B2]">New Password</h1>
          <p className="mt-4 text-sm text-[#7C95CF] font-medium">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        {/* form area */}
        <div className="mt-8">
          {/* yellow box */}
          <form onSubmit={handleSubmit}>
            <div className="bg-[#FFEB83] rounded-2xl p-4 sm:p-5">
              {/* password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
                  <Lock size={16} />
                  Password
                </label>

                <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
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

              {/* confirm password */}
              <div className="mb-0 mt-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
                  <Lock size={16} />
                  Confirm Password
                </label>

                <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} className="text-[#4969B2]" />
                    ) : (
                      <Eye size={18} className="text-[#4969B2]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* reset password button (อยู่นอกกล่อง) */}
            <button
              type="submit"
              disabled={loading}
              className="
                            mt-8 w-full
                            bg-[#4969B2] text-white text-base
                            py-3 sm:py-4
                            rounded-2xl font-bold
                            hover:bg-[#3E5FA3] transition
                            "
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
