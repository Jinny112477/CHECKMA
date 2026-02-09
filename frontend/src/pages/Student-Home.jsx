import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Settings,
  LogOut,
  Plus,
  CirclePlus,
} from "lucide-react";
import { Link } from "react-router-dom";

import CourseCard from "../components/CourseCard.jsx";

/* ===== reusable menu item ===== */
function MenuItem({ icon: Icon, label, onClick, variant = "primary", to }) {
  const variants = {
    primary: "bg-[#AFC1F3] text-[#4F6DB8]",
    danger: "bg-[#AFC1F3] text-white",
    join: "bg-[#AFC1F3] text-[#4F6DB8]",
  };

  if(to) {
    return (
      <Link to={to} onClick={onClick} className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition ${variants[variant]}`}>
        <Icon size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition ${variants[variant]}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function HomeStudent() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const headerRef = useRef(null);
  const joinRef = useRef(null);

  /* ===== mock data (เพิ่มการ์ดจากตรงนี้) ===== */
  const DEV_EMPTY = true; // true = ไม่มีวิชา ทดสอบการแสดง empty state

  const courses = DEV_EMPTY
    ? []
    : [
        {
            code: "SF321",
            section: "760001",
            name: "Data Communication and Computer Network 1",
            teacher: "Aj.Piya Techateerawat",
            room: "ENGR 310",
            time: "13:30 - 16:30",
            day: "MON",
        },

        {
            code: "SF321",
            section: "760001",
            name: "Data Communication and Computer Network 1",
            teacher: "Aj.Piya Techateerawat",
            room: "ENGR 310",
            time: "13:30 - 16:30",
            day: "MON",
        },

        {
            code: "SF321",
            section: "760001",
            name: "Data Communication and Computer Network 1",
            teacher: "Aj.Piya Techateerawat",
            room: "ENGR 310",
            time: "13:30 - 16:30",
            day: "MON",
        },
    ];

  const hasSubject = courses.length > 0;

  useEffect(() => {
    function handleClickOutside(e) {
      if (openMenu && headerRef.current && !headerRef.current.contains(e.target))
        setOpenMenu(false);

      if (showJoin && joinRef.current && !joinRef.current.contains(e.target))
        setShowJoin(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, showJoin]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      <div className="relative w-full max-w-[390px] h-screen bg-[#4F6DB8] flex flex-col overflow-hidden">

        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-[90px] flex items-center justify-between px-5">
            <button onClick={() => setOpenMenu(!openMenu)}>
              <Menu
                size={28}
                className={`text-white transition-transform duration-300 ${
                  openMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* profile picture */}
            <Link to="/student/profile">
              <button className="w-10 h-10 rounded-full bg-[#9DB2E3] overflow-hidden">
                <img src="/NongCheckprofile.png" className="w-full h-full object-cover" />
              </button>
            </Link>
          </header>

          {openMenu && (
            <div className="absolute top-[70px] left-4 space-y-2 z-30">
              <MenuItem
                icon={Settings}
                label="Setting"
                to="/student/profile"
                onClick={() => setOpenMenu(false)}
              />
              <MenuItem
                icon={LogOut}
                label="Log out"
                variant="danger"
                onClick={() => setOpenMenu(false)}
              />
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-4">

          {/* ===== EMPTY STATE ===== */}
          {!hasSubject && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4
                            animate-[fadeIn_0.6s_ease-out_forwards]">
              <div
                className="w-[180px] h-[180px] rounded-full bg-[#FFD6B0]
                           flex items-center justify-center
                           animate-[scaleIn_0.6s_ease-out_forwards]"
              >
                <img
                  src="/NongCheck.svg"
                  alt="empty"
                  className="w-[140px] h-[140px]"
                />
              </div>

              <p className="text-[#FFB37A] font-semibold text-lg">
                Let’s get started!
              </p>
            </div>
          )}

          {/* ===== COURSE CARDS ===== */}
          {hasSubject && (
            <div className="space-y-4">
              {courses.map((course, index) => (
                <CourseCard
                  key={index}
                  {...course}
                  onSetting={() =>
                    console.log("Setting clicked:", course.code)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= JOIN BUTTON ================= */}
        <div
          ref={joinRef}
          className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {showJoin && (
            <MenuItem
              icon={CirclePlus}
              label="Join Class"
              variant="join"
              to="/student/join"
              onClick={() => setShowJoin(false)}
            />
          )}

          <button
            onClick={() => setShowJoin(!showJoin)}
            className={`w-14 h-14 rounded-full bg-[#4969B2] flex items-center justify-center text-white transition-transform duration-300 ${
              showJoin ? "rotate-45" : ""
            }`}
          >
            <Plus size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}