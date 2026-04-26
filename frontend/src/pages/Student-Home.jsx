import { useEffect, useRef, useState } from "react";
import { Menu, Settings, LogOut, Plus, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

import CourseCard from "../components/CourseCard.jsx";

/* ===== reusable menu item ===== */
function MenuItem({ icon: Icon, label, onClick, variant = "primary", to }) {
  const variants = {
    primary: "bg-[#AFC1F3] text-[#4F6DB8]",
    danger: "bg-[#AFC1F3] text-white",
    join: "bg-[#AFC1F3] text-[#4F6DB8]",
  };

  const className =
    `w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow transition ${variants[variant]}`;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className}>
        <Icon size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function HomeStudent() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [courses, setCourses] = useState([]);

  const headerRef = useRef(null);
  const joinRef = useRef(null);

  const { profile, handleSignOut } = useAuth();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";

  const API_URL = import.meta.env.VITE_API_URL;

  const hasSubject = courses.length > 0;

  const dayMap = {
    Monday: "MON",
    Tuesday: "TUE",
    Wednesday: "WED",
    Thursday: "THU",
    Friday: "FRI",
    Saturday: "SAT",
    Sunday: "SUN",
  };

  //Day Mapping
  const formatDay = (day) => {
    return dayMap[day] || day;
  };

  //Time Mapping
  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openMenu &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }

      if (showJoin && joinRef.current && !joinRef.current.contains(e.target)) {
        setShowJoin(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, showJoin]);

  // GET: fetch joined class
  useEffect(() => {
    if (!profile?.id) return;

    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/participants/join-session`,
          {
            params: {
              user_id: profile.id,
            },
          },
        );

        const sessions = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        console.log("sessions:", sessions);
        setCourses(sessions);
      } catch (err) {
        console.error("Failed to load sessions:", err);
        setCourses([]);
      }
    };

    fetchSessions();
  }, [profile?.id]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#FFFBEA]">
      <div
        className="relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#4969B2]
                    shadow-none sm:shadow-xl
                    flex flex-col
                    overflow-hidden"
      >
        {/* ================= HEADER ================= */}
        <div
          ref={headerRef}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
        >
          <div className="relative bg-[#4969B2]">
            <header className="h-20 flex items-center justify-between px-5">
              <button onClick={() => setOpenMenu(!openMenu)}>
                <Menu
                  size={28}
                  className={`text-white transition ${openMenu ? "rotate-180" : ""}`}
                />
              </button>

              <img src="/CHECKMA-logo-white.svg" className="h-7" />

              <Link to="/student/profile">
                <button className="w-10 h-10 rounded-full bg-[#9DB2E3] overflow-hidden">
                  <img
                    src={avatar}
                    onError={(e) => (e.target.src = "/NongCheckprofile.png")}
                    className="w-full h-full object-cover"
                  />
                </button>
              </Link>
            </header>

            {openMenu && (
              <div className="absolute top-16 left-4 space-y-2 z-30">
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
                  onClick={handleSignOut}
                />
              </div>
            )}

            <div className="h-10 w-full rounded-t-[40px] bg-[#FFFBEA]" />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 bg-[#FFFBEA] overflow-y-auto p-4 pb-24 pt-[120px]">
          {/* EMPTY STATE */}
          {!hasSubject && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-48 h-48 rounded-full bg-[#FFD6B0] flex items-center justify-center">
                <img src="/NongCheck.svg" className="w-40 h-40" />
              </div>

              <p className="text-[#FFB37A] font-semibold text-lg">
                Let’s get started!
              </p>
            </div>
          )}

          {/* COURSE CARDS */}
          {hasSubject && (
            <div className="space-y-6">
              {courses.map((item, index) => (
                <CourseCard
                  key={index}
                  session_id={item.session_id}
                  icon={item.icon}
                  code={item.course_id}
                  section={item.section}
                  name={item.course_name}
                  teacher={item.teacher}
                  room={item.room}
                  time={`${formatTime(item.start_time)} - ${formatTime(item.end_time)}`}
                  day={formatDay(item.day)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= JOIN BUTTON ================= */}
        <div
          ref={joinRef}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 flex flex-col items-end gap-3 pr-4"
        >
          {showJoin && (
            <div classname="w-fit">
              <MenuItem
                icon={CirclePlus}
                label="Join Class"
                to="/student/join"
                onClick={() => setShowJoin(false)}
                variant="join"
              />
            </div>
          )}

          <button
            onClick={() => setShowJoin(!showJoin)}
            className={`flex-shrink-0 w-14 h-14 rounded-full bg-[#4969B2] flex items-center justify-center text-white transition-transform duration-300 ${
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
