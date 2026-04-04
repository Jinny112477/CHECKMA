import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  House
} from "lucide-react";
import { Link } from "react-router-dom";
import ClassCard from "../components/ClassCard";

export default function Dashboard() {

  const data = [
    {classNum: "Class 1", date: "19/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 3", date: "25/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
    {classNum: "Class 2", date: "20/01/2026"},
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
                    overflow-y-auto">

        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50">
          <div className="relative bg-[#4969B2]">
            <header className="h-20 flex items-center justify-between px-5">
              {/* back arrow */}
              <Link to="/prof/attendance" className="top-6 left-6 text-white">
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
          </div>
          <hr className="w-80 h-1 mx-auto mb-2 bg-white border-0 rounded-sm" />
        </div>


        <div className="px-8 pt-[100px]">
          {data.map((item, index) => (
            <Link
              key={index}
              to="/prof/dashboard-info"
              state={item}
              className="block mb-4"
            >
              <ClassCard {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}