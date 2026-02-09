import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RoleCard from "../components/RoleCard";

export default function RoleSelect() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] px-4 font-quicksand">
      <div className="relative w-full max-w-[390px] min-h-screen sm:min-h-[844px] px-6 pt-10">

        {/* back */}
        <Link to="/register" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={28} />
        </Link>

        {/* title */}
        <h1 className="mt-[27px] text-5xl font-bold text-[#4969B2] leading-none">
          Select<br />user type
        </h1>
        <p className="mt-3 text-[#95A9D7] text-sm">
          Let us know the best setup for you!
        </p>

        {/* cards */}
        <div className="mt-10 space-y-6">
          <RoleCard
            label="STUDENT"
            imagePath="/NongCheck.svg"
            active={role === "student"}
            onClick={() => setRole("student")}
            bg="bg-[#FFF6C7]"
            hoverBg="bg-[#FFEB83]"
            activeBg="bg-[#FFEB83]"
            border="border-[#6B86D6]"
            textColor="text-[#4969B2]"
          />

          <RoleCard
            label="PROFESSOR"
            imagePath="/ProfNongCheck.svg"
            active={role === "professor"}
            onClick={() => setRole("professor")}
            bg="bg-[#D6E0FA]"
            hoverBg="bg-[#AFC2F0]"
            activeBg="bg-[#4F6FB8]"
            border="border-[#F7C873]"
            textColor="text-white"
          />
        </div>

        {/* warning */}
        <p className="mt-[45px] text-center text-xs">
          <span className="text-[#FF5252] text-[14px] font-bold">* </span>
          <span className="text-[#718DCC] font-medium">
            Please make sure of your choice before submitting, the role{" "}
          </span>
          <span className="text-[#F49A5E] font-semibold">
            cannot be changed later.
          </span>
        </p>

        {/* submit */}
        <button
          className="
            mt-6 w-full py-4 rounded-2xl
            bg-[#F4A261] text-white font-semibold
            transition hover:brightness-95
          "
        >
          Submit
        </button>
      </div>
    </div>
  );
}