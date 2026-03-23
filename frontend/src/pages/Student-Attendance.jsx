import { useEffect, useRef, useState } from "react";
import {ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";

import AttendanceCard from "../components/AttendanceCard";
import { supabase } from "../lib/supabaseClient";

export default function AttendanceStudent() {

  const data = [
    { classNum: "Class 1", date: "19/01/2026", time: "13.30", status: "Present" },
    { classNum: "Class 2", date: "20/01/2026", time: "09.00", status: "Absent" },
    { classNum: "Class 3", date: "25/01/2026", time: "09.00", status: "Late" }
  ];

  const total = data.length;

  const [profile, setProfile] = useState(null);
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";

  const headerRef = useRef(null);

  //fetch User profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("SESSION:", session);

        if (!session) {
          console.log("No session found");
          return;
        }

        const res = await fetch("http://localhost:5000/api/users/profile", { 
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        console.log("STATUS:", res.status);

        const data = await res.json();
        console.log("API RESPONSE:", data);

        setProfile(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchProfile();
  }, []);

  const presentCount = data.filter(d => d.status === "Present").length;
  const lateCount = data.filter(d => d.status === "Late").length;
  const absentCount = data.filter(d => d.status === "Absent").length;

  const presentPercent = (presentCount / total) * 100;
  const latePercent = (lateCount / total) * 100;
  const absentPercent = (absentCount / total) * 100;

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
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
            <Link to="/student/home" className="top-6 left-6 text-white">
                <ArrowLeft size={32} />
            </Link>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* profile picture */}
            <Link to="/student/profile">
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

        {/* Class name */}
        <div className="ml-8 my-5">
          <h1 className="text-5xl font-bold text-white">
            SF321
          </h1>
          <p className="mt-3 text-sm text-white font-medium">
              Data Communication and Computer Network 1<br />
              Section 760001
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-4 flex flex-col">

          {/* ===== Progress Section ===== */}
          <div className="rounded-full p-6 space-y-4">

            <p className="text-xl font-bold text-[#9DB2E3]">
              From <span className="text-[#4969B2]">{total}</span> Classes
            </p>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden flex">
  
              {/* Present */}
              <div
                className="h-full bg-[#6BBF84]"
                style={{ width: `${presentPercent}%` }}
              />

              {/* Late */}
              <div
                className="h-full bg-[#FBE475]"
                style={{ width: `${latePercent}%` }}
              />

              {/* Absent */}
              <div
                className="h-full bg-[#D45F52]"
                style={{ width: `${absentPercent}%` }}
              />

            </div>

            {/* Status Text */}
            <div className="flex justify-between text-sm font-medium">
              <span className="text-[#6BBF84]">
                Present {presentPercent.toFixed(0)}%
              </span>
              <span className="text-[#EAB308]">
                Late {latePercent.toFixed(0)}%
              </span>
              <span className="text-[#D45F52]">
                Absent {absentPercent.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* ===== Cards ===== */}
          <div className="space-y-4">
            {data.map((item, index) => (
              <AttendanceCard key={index} {...item} />
            ))}
          </div>

          {/* save button */}
          <Link href="" className="mt-auto pt-6">
            <button
              className="w-full bg-[#F49A5E] text-[#FFFBEA] py-3 sm:py-4 mt-auto mb-8
              rounded-2xl font-bold hover:bg-[#EB9358] transition"
            >
              CHECK!
            </button>
          </Link>
        </div>
   
      </div>
    </div>
  );
}