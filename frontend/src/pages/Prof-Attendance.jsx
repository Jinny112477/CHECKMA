import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ClipboardList, ShieldPlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StudentList from "../components/StudentList";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen.jsx";

export default function AttendanceProf() {
  const [classData, setClassData] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [activeClassId, setActiveClassId] = useState(null);

  const { profile, subscribeToParticipants, unsubscribe } = useAuth();
  const { session_id } = useParams();

  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);
  const number = studentData.length;
  const API_URL = import.meta.env.VITE_API_URL;

  // REALTIME RENDER: fetch session participants
  useEffect(() => {
    if (!session_id) return;

    let channel = null;
    let isMounted = true;

    const fetchParticipants = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/participants/join-session/${session_id}`,
        );
        const result = await res.json();
        console.log("Fetched participants:", result);
        if (isMounted) setStudentData(result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchParticipants();

    const timer = setTimeout(() => {
      if (!isMounted) return;

      channel = subscribeToParticipants(session_id, (payload) => {
        console.log("🔔 Realtime event received:", payload);
        fetchParticipants();
      });
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (channel) unsubscribe(channel);
    };
  }, [session_id]);

  // GET: Class by SESSION ID
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/sessions/classrooms/${session_id}`,
        );
        const data = await res.json();
        setClassData(data);

        // 👈 fetch open class to get class_id
        const classRes = await fetch(
          `${API_URL}/api/classes/class-session/${session_id}`,
        );
        const classes = await classRes.json();
        const openClass = classes.find((c) => c.status === "open");
        setActiveClassId(openClass?.id || null);
      } catch (err) {
        console.error(err);
      }
    };

    if (session_id) fetchClass();
  }, [session_id]);

  // POST: Create new class in session
  const handleCreateClass = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`${API_URL}/api/classes/class-session`, {
            // 👈 fix URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id,
              location_lat: pos.coords.latitude,
              location_lng: pos.coords.longitude,
              radius: 50,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Server error:", text);
            alert("Failed to create class");
            return;
          }

          const data = await res.json();
          console.log("New class:", data);
          alert("New class created!")
        } catch (err) {
          console.error("Fetch error:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Please allow location access");
      },
    );
  };

  // DELETE: delete participants
  const handleStudentDelete = async (user_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student?",
    );
    if (!confirmed) return; // 👈 stop if cancelled

    try {
      const res = await fetch(
        `${API_URL}/api/participants/join-session/${session_id}/${user_id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Failed to delete");

      setStudentData((prev) => prev.filter((s) => s.user_id !== user_id));
      alert("Student removed successfully!"); // 👈 success alert
    } catch (err) {
      console.error(err);
      alert("Failed to remove student."); // 👈 error alert
    }
  };

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
            <Link to="/prof/home" className="top-6 left-6 text-white">
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

        {/* Class name */}
        <div className="mx-8 my-5">
          <div className="flex">
            <h1 className="text-5xl font-bold text-white">
              {classData?.course_id || "-"}
            </h1>
            <Link to={`/prof/dashboard/${session_id}`} className="ml-auto">
              <button
                className="
                  w-12 h-12 rounded-full
                  bg-[#F49A5E]
                  flex items-center justify-center
                  hover:scale-105 transition"
              >
                <ClipboardList size={28} className="text-white" />
              </button>
            </Link>
          </div>

          <p className="mt-3 text-sm text-white font-medium">
            {classData?.course_name || "-"}
            <br />
            Section {classData?.section || "-"}
          </p>
        </div>

        <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-8 flex flex-col">
          <div
            className="bg-[#4969B2] rounded-xl px-5 py-3 flex items-center shadow 
             gap-2 text-sm font-semibold text-white"
          >
            <ShieldPlus size={16} />
            Class Code
            <div
              className="bg-white rounded-lg flex-1 text-base text-[#4969B2] font-bold
              flex items-center justify-center py-1"
            >
              {classData?.session_code || "-"}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex my-4">
            <Link
              to={`/prof/signal/${session_id}/${activeClassId}`}
              className="flex-1"
            >
              <button
                disabled={!activeClassId}
                className="w-full bg-[#F49A5E] text-[#FFFBEA] py-2 
                rounded-xl font-bold hover:bg-[#EB9358] transition"
              >
                CHECK!
              </button>
            </Link>

            {/* new class button */}
            <div className="flex justify-center">
              <button
                onClick={handleCreateClass}
                className="bg-[#9DB2E3] text-[#FFFBEA] py-2 px-4 rounded-xl font-bold 
                transition hover:bg-[#7C95CF] flex items-center ml-2"
              >
                New Class
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[#4969B2] text-2xl font-bold">
              Student Lists
            </div>
            <div className="text-[#9DB2E3] text-sm font-medium">
              Total <span className="text-[#4969B2] font-bold">{number}</span>{" "}
              Students
            </div>
          </div>

          <div className="space-y-4">
            {studentData.map((item) => (
              <StudentList
                key={item.student_id}
                student_id={item.users.student_info?.student_id}
                firstname={item.users.student_info?.firstname}
                surname={item.users.student_info?.surname}
                onDelete={() => handleStudentDelete(item.user_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
