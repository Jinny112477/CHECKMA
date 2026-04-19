import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import SignalCard from "../components/SignalCard";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignalProf() {

  const data = [
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740000" },
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740001" },
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740002" }
  ];

  const { profile } = useAuth();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);
  const { session_id } = useParams();

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div className="relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#4969B2]
                    shadow-none sm:shadow-xl
                    flex flex-col
                    overflow-hidden">

        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-20 flex items-center justify-between px-5">
            {/* back arrow */}
            <Link to={`/prof/attendance/${session_id}`} className="top-6 left-6 text-white">
                <ArrowLeft size={32} />
            </Link>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* profile picture */}
            <Link to="/prof/profile">
              <button className="w-10 h-10 rounded-full bg-[#9DB2E3] overflow-hidden">
                <img
                  src={avatar}
                  onError={(e) => {
                    e.target.src = "/NongCheckprofile.png";
                  }}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </Link>
          </header>
          <hr className="w-80 h-1 mx-auto mb-2 bg-white border-0 rounded-sm" />
        </div>

        {/* gif */}
        <div className="flex justify-center">
          <img src="/NongCheckgif.GIF"
          alt="NongCheckgif"
          className="w-56 h-56"></img>
        </div> 

        <div className="p-8 space-y-4">
          {data.map((item, index) => (
            <SignalCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}