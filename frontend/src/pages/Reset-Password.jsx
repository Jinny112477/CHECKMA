import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

{/* Sending popup */}
function SendingPopup ({ loading }){
  if (!loading) return null;
  const isComplete = loading === "complete";

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center bg-[#FFAC75] rounded-3xl p-4">
        {/* GIF character */}
        <img
          src="/NongCheckgif.GIF"
          alt="status character"
          className="w-28 h-28 object-contain"
        />

        <p className="mt-4 text-base font-semibold text-[#FFFBEA]">
          {isComplete ? "Complete!" : "Sending..."}
        </p>
      </div>
    </div>
  );
}


export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  //Email submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading("loading");

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setLoading(null);
        setError(error.message);
      } else {
        setLoading("complete");    

        setTimeout(() => {
          setLoading(null);
          navigate("/reset/check-email");
        }, 1500);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SendingPopup loading={loading} /> 

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
          <h1 className="text-5xl font-bold text-[#4969B2]">Reset Password</h1>
          <p className="mt-4 text-sm text-[#7C95CF] font-medium">
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </p>
        </div>

        {/* form area */}
        <div className="mt-8">
          {/* yellow box */}
          <form onSubmit={handleSubmit}>
            <div className="bg-[#FFEB83] rounded-2xl p-4 sm:p-5">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
                <Mail size={16} />
                Email
              </label>

              <div className="flex items-center bg-white font-semibold rounded-xl px-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                  w-full px-3 py-3 bg-transparent outline-none
                  placeholder:text-[#9DB2E3] placeholder:font-normal
                "
                />
              </div>
            </div>

            {/* reset password button */}
             <button
                type="submit"
                disabled={!!loading}
                className="mt-8 w-full bg-[#4969B2] text-white text-base py-3 sm:py-4 rounded-2xl font-bold hover:bg-[#3E5FA3] transition disabled:opacity-60"
              >
                Send Instructions
              </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
