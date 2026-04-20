import { useEffect, useRef, useState } from "react";
import { ArrowLeft, House } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import InfoCard from "../components/InfoCard";

export default function DashboardInfo() {
  const location = useLocation();
  const selectedClass = location.state;

  const data = [
    {
      firstname: "Vidsava",
      surname: "Thammasat",
      student_id: "6710740000",
      time: "13.30",
      status: "Present",
    },
    {
      firstname: "Vidsava",
      surname: "Thammasat",
      student_id: "6710740001",
      time: "09.00",
      status: "Absent",
    },
  ];

  const hasStudent = data.length > 0;
  const headerRef = useRef(null);
  const { session_id } = useParams();

  // Save state: handler

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div
        className="relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#4969B2]
                    shadow-none sm:shadow-xl
                    flex flex-col
                    overflow-y-auto"
      >
        {/* ================= HEADER ================= */}
        <div
          ref={headerRef}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
        >
          <div className="relative bg-[#4969B2]">
            <header className="h-20 flex items-center justify-between px-5">
              {/* back arrow */}
              <Link
                to={`/prof/dashboard/${session_id}`}
                className="top-6 left-6 text-white"
              >
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

        {/* classNum & date */}
        <div className="flex-1 overflow-y-auto pt-[100px] px-6">
          {/* class header (ALWAYS show) */}
          <div className="flex mb-4 items-center">
            <div>
              <div className="text-white text-2xl font-bold mb-1">
                {selectedClass?.class_name || "-"}
              </div>

              <div className="bg-white text-xs font-semibold px-4 py-1 rounded-lg w-fit">
                <div className="text-[#4969B2]">
                  {selectedClass?.class_date
                    ? new Date(selectedClass.class_date).toLocaleDateString(
                        "en-GB",
                      )
                    : "-"}
                </div>
              </div>
            </div>

            <button className="bg-[#6BBF84] text-white text-sm py-1 px-4 rounded-lg font-bold ml-auto">
              Save
            </button>
          </div>

          {/* ===== EMPTY STUDENT STATE ===== */}
          {!hasStudent && (
            <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
              <div className="w-40 h-40 rounded-full bg-[#9DB2E3] flex items-center justify-center">
                <img src="/NongCheck.svg" alt="empty" className="w-32 h-32" />
              </div>

              <p className="text-[#FFFFFF] font-semibold text-lg">
                No students yet!
              </p>
            </div>
          )}

          {/* ===== STUDENT LIST ===== */}
          {hasStudent && (
            <div className="space-y-4">
              {data.map((item, index) => (
                <InfoCard key={index} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
