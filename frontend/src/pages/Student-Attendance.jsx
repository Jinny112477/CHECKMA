import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AttendanceCard from "../components/AttendanceCard";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function AttendanceStudent() {
  const [attendanceData, setAttendanceData] = useState([]);

  const [classData, setClassData] = useState(null);
  const [activeClassId, setActiveClassId] = useState(null);

  const total = attendanceData.length;
  const { profile, authUserId } = useAuth();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);
  const { session_id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  // BAR CALC
  const presentCount = attendanceData.filter(
    (d) => d.status === "Present",
  ).length;
  const lateCount = attendanceData.filter((d) => d.status === "Late").length;
  const absentCount = attendanceData.filter(
    (d) => d.status === "Absent",
  ).length;

  const presentPercent = (presentCount / total) * 100;
  const latePercent = (lateCount / total) * 100;
  const absentPercent = (absentCount / total) * 100;

  // REALTIME RENDER: listen for attendance changes
  useEffect(() => {
    if (!authUserId || !session_id) return;

    const channel = supabase
      .channel(`attendance-${session_id}-${authUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "attendance_records",
          filter: `user_id=eq.${authUserId}`,
        },
        (payload) => {
          console.log("📡 Attendance change:", payload);
          // Refetch attendance data on any change
          fetch(`${API_URL}/api/attend/check-in/${session_id}/${authUserId}`)
            .then((res) => res.json())
            .then((data) => setAttendanceData(data))
            .catch(console.error);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [authUserId, session_id]);

  //Time Mapping
  const formatTime = (time) => {
    if (!time) return "-"; // In case student doesn't check
    return time.slice(11, 16);
  };

  // GET: Class by SESSION ID + active class
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const [sessionRes, classRes] = await Promise.all([
          fetch(`${API_URL}/api/sessions/classrooms/${session_id}`),
          fetch(`${API_URL}/api/classes/class-session/${session_id}`),
        ]);

        const sessionData = await sessionRes.json();
        const classes = await classRes.json();

        setClassData(sessionData);

        const openClass = classes.find((c) => c.status === "open");
        setActiveClassId(openClass?.id || null);
      } catch (err) {
        console.error(err);
      }
    };

    if (session_id) fetchClassData();
  }, [session_id]);

  // GET: joined class session
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        console.log("Fetching with authUserId:", authUserId);
        const res = await fetch(
          `${API_URL}/api/attend/check-in/${session_id}/${authUserId}`,
        );
        const data = await res.json();
        setAttendanceData(data);
      } catch (err) {
        console.error("CATCH ERROR: ", err);
      }
    };

    if (session_id && authUserId) {
      fetchAttendance();
    }
  }, [session_id, authUserId]);

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
            {classData?.course_id || "-"}
          </h1>
          <p className="mt-3 text-sm text-white font-medium">
            {classData?.course_name || "-"}
            <br />
            Section {classData?.section || "-"}
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-8 flex flex-col">
          {/* ===== Progress Section ===== */}
          <div className="rounded-full p-2 space-y-2 mb-6">
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
            {attendanceData.map((item) => (
              <AttendanceCard
                key={item.id} // ← use id, not session_id
                classNum={item.class_name}
                date={
                  item?.class_date
                    ? new Date(item.class_date).toLocaleDateString("en-GB")
                    : "-"
                }
                time={formatTime(item.check_in_time)} // ← now flat, not nested
                status={item.status} // ← now flat, not nested
              />
            ))}
          </div>

          {/* check button */}
          <Link
            to={`/student/signal/${session_id}/${activeClassId}`}
            className="mt-auto pt-6"
          >
            <button
              disabled={!activeClassId} // 👈 disable if no open class
              className="w-full bg-[#F49A5E] text-[#FFFBEA] py-3 sm:py-4 mt-auto mb-8
    rounded-2xl font-bold hover:bg-[#EB9358] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CHECK!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
