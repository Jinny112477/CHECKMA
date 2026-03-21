import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";

import { useAuth } from "../context/AuthContext";

export default function RoleSelect() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  // Auth function
  const { updateRole } = useAuth();

  // Role select: Navigation handler
  const handleSelectRole = async (selectedRole) => {
    const { error } = await updateRole(selectedRole);

    if (error) {
      alert(error.message);
      return;
    }

    if (selectedRole === "student") {
      navigate("/student/home", { replace: true });
    }

    if (selectedRole === "professor") {
      navigate("/prof/home", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] px-4 font-quicksand">
      <div className="relative
          w-full max-w-[390px]
          h-screen
          bg-[#FFFBEA]
          shadow-none sm:shadow-xl
          px-6 pt-8 pb-8
          flex flex-col
          overflow-hidden">
        {/* back */}
        <Link to="/register" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <h1 className="mt-12 text-5xl font-bold text-[#4969B2] leading-none">
          Select
          <br />
          user type
        </h1>
        <p className="mt-4 text-[#7C95CF] text-sm font-medium">
          Let us know the best setup for you!
        </p>

        {/* cards */}
        <div className="mt-8 space-y-6">
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
            activeBg="bg-[#4969B2]"
            border="border-[#F7C873]"
            textColor="text-white"
          />
        </div>

        {/* warning */}
        <p className="mt-8 text-center text-xs">
          <span className="text-[#FF5252] text-sm font-bold">* </span>
          <span className="text-[#7C95CF] font-medium">
            Please make sure of your choice before submitting, the role{" "}
          </span>
          <span className="text-[#F49A5E] font-semibold">
            cannot be changed later.
          </span>
        </p>

        {/* submit */}
        <button
          onClick={() => handleSelectRole(role)}
          className="
            mt-6 w-full py-4 rounded-2xl
            bg-[#F49A5E] text-base text-white font-bold
            transition hover:bg-[#EB9358]
          "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
