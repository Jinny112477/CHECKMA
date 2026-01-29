import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">
      {/* phone container */}
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
        {/* illustration */}
        <div className="relative mt-16 flex justify-center">
          {/* main circle */}
          <div
            className="
              w-48 h-48
              rounded-full
              bg-[#4969B2]
              flex items-center justify-center
              relative
            "
          >
            {/* character image */}
            <img
              src="/NongCheck.svg"
              alt="NongCheck"
              className="w-[140px] h-[140px] object-contain"
            />

            {/* speech bubble */}
            <div
              className="
                absolute
                -right-4 top-6
                bg-[#FFEB83]
                rounded-full
                w-14 h-14
                flex items-center justify-center
                shadow-md
              "
            >
              <MailCheck size={26} className="text-[#4969B2]" />
            </div>
          </div>
        </div>

        {/* text */}
        <div className="mt-10 text-center px-4">
          <h1 className="text-3xl font-bold text-[#4969B2]">
            Check your mail!
          </h1>
          <p className="mt-3 text-sm text-[#95A9D7] leading-relaxed">
            We have sent a password recover
            <br />
            instructions to your email.
          </p>
        </div>

        {/* action */}
        <div className="mt-10 px-2">
          <button
            className="
              w-full
              bg-[#FFEB83]
              text-[#4969B2]
              py-3
              rounded-2xl
              font-semibold
              hover:opacity-90 transition
            "
          >
            Open email app
          </button>

          <p className="mt-4 text-center text-sm text-[#4969B2] underline cursor-pointer">
            Skip for now
          </p>
        </div>

        {/* bottom helper text */}
        <div className="mt-auto pt-10 text-center text-xs text-[#95A9D7] leading-relaxed">
          <p>
            Did not receive the email? Check your spam filter,
            <br />
            or{" "}
            <Link to="/reset-password"
                className="underline font-semibold text-[#F49A5E] hover:text-[#FC812E] transition">
                  try another email address
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}