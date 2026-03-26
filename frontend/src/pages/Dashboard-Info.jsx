import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  House
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import InfoCard from "../components/InfoCard";

export default function DashboardInfo() {

  {/* ดึงค่าจาก dashboard */}
  const location = useLocation();
  const { classNum, date } = location.state || {};

  const data = [
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740000", time: "13.30", status: "Present" },
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740001", time: "09.00", status: "Absent" },
    {firstname: "Vidsava", surname: "Thammasat", student_id: "6710740002", time: "09.00", status: "Late" }
  ];

  const headerRef = useRef(null);

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
            <Link to="/prof/dashboard" className="top-6 left-6 text-white">
                <ArrowLeft size={32} />
            </Link>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* house */}
            <Link
              to="/prof/home"
              className="flex items-center justify-center text-white"
            >
              <House size={28} />
            </Link>
          </header>
          <hr className="w-80 h-1 mx-auto mb-2 bg-white border-0 rounded-sm" />
        </div>

        {/* classNum & date */}
        <div className="flex px-8 my-4 items-center">
          <div className="text-white text-3xl font-bold">{classNum}</div>
          <div className="bg-white text-base font-semibold ml-auto px-4 py-1 rounded-lg">
            <div className="text-[#4969B2]">{date}</div>
          </div>
        </div>

        <div className="px-8 space-y-4">
          {data.map((item, index) => (
            <InfoCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}