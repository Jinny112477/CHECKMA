import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  //Auth function
  const { handleGoogleAuthen } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-quicksand">
      <div
        className="
            relative
            w-full max-w-[390px]
            min-h-screen sm:min-h-[844px]
            rounded-none sm:rounded-[20px]
            overflow-hidden
            shadow-none sm:shadow-xl
            px-6 pt-8 pb-8
            flex flex-col justify-between
            bg-no-repeat
            "
        style={{
          backgroundImage: "url('/CHECKMA.svg')",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
        }}
      >
        {/*Logo block */}
        <div>
          <div className="mt-10 mb-16 flex justify-center">
            <img src="/CHECKMA-logo.svg" className="h-16" />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full mt-auto mb-6">
          {/* Login */}
          <Link to="/login">
            <button
              className="w-full bg-[#FFEC89] text-base text-[#4969B2] py-3 sm:py-4
              rounded-2xl font-bold mb-4 hover:bg-[#FBE475] transition"
            >
              Login
            </button>
          </Link>

          {/* Sign up */}
          <Link to="/register">
            <button
              className="w-full bg-[#4969B2] text-base text-[#FFEC89] py-3 sm:py-4
              rounded-2xl font-bold mb-4 hover:bg-[#3E5FA3] transition"
            >
              Sign up
            </button>
          </Link>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-[#4969B2]" />
            <span className="px-3 text-sm font-medium text-[#4969B2]">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#4969B2]" />
          </div>

          {/* Google button */}
          <button
            onClick = {handleGoogleAuthen}
            className="w-full border-2 border-black bg-white py-3
            rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img src="/googleicon.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Google Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
