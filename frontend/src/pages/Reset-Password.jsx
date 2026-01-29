import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
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
          px-6 pt-10 pb-8
          flex flex-col
        "
      >

        {/* back arrow */}
        <Link to="/login" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div className="mt-11">
          <h1 className="text-5xl font-bold text-[#4969B2]">
            Reset Password
          </h1>
          <p className="mt-3 text-sm text-[#95A9D7] font-light">
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </p>
        </div>

        {/* form area */}
        <div className="mt-8">

          {/* yellow box */}
          <div className="bg-[#FFEB83] rounded-2xl p-4 sm:p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Mail size={16} />
              Email
            </label>

            <div className="flex items-center bg-white font-semibold rounded-xl px-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="
                  w-full px-3 py-3 bg-transparent outline-none
                  placeholder:text-[#9DB2E3]
                "
              />
            </div>
          </div>

          {/* reset password button (อยู่นอกกล่อง) */}
          <Link to="/reset/check-email">
          <button
            className="
              mt-8 w-full
              bg-[#4969B2] text-white
              py-3 sm:py-4
              rounded-2xl font-semibold
              hover:bg-[#3E5FA3] transition
            "
          >
            Send Instructions
          </button>
          </Link>
        </div>

      </div>
    </div>
  );
}