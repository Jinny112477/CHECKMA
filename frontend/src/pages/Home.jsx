import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
            px-6 pt-10 pb-8
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
              className="w-full bg-[#FFEC89] text-[#4F6DB8] py-3 sm:py-4
              rounded-2xl font-bold mb-4 hover:opacity-90 transition"
            >
              Login
            </button>
          </Link>

          {/* Sign up */}
          <Link to="/register">
            <button
              className="w-full bg-[#4969B2] text-white py-3 sm:py-4
              rounded-2xl font-semibold mb-6 hover:bg-[#3E5FA3] transition"
            >
                <span className="text-[#FFEC89]"> Sign up</span>
            </button>
          </Link>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-[#4F6DB8]" />
            <span className="px-3 text-sm text-[#4F6DB8]">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#4F6DB8]" />
          </div>

          {/* Google button */}
          <button
            className="w-full border-2 border-black bg-white py-3
            rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img
              src="/googleicon.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium">
              Google Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
