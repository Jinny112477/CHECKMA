import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ClipboardList, ShieldPlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StudentList from "../components/StudentList";
import { useAuth } from "../context/AuthContext";

export default function AttendanceProf() {
  // เปลี่ยน const data เป็น useState (Temp)
  const [data, setData] = useState([
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740000" },
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740001" },
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740002" },
  ]);

  const [classData, setClassData] = useState(null);

  // Data mapping (Temp)
  {
    data.map((item, index) => (
      <StudentList
        key={item.student_id}
        {...item}
        onDelete={() => setData(data.filter((_, i) => i !== index))}
      />
    ));
  }

  const number = data.length;
  const { profile } = useAuth();
  const { session_id } = useParams();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);

  // GET: Class by ID
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/classrooms/${session_id}`);

        const data = await res.json();
        setClassData(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (session_id) fetchClass();
  }, [session_id]);

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
            <h1 className="text-5xl font-bold text-white">{classData?.course_code || "-"}</h1>
            <Link to="/prof/dashboard" className="ml-auto">
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
            {classData?.course_name || "-"}<br />
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
            <Link to="/prof/signal" className="flex-1">
              <button
                className="w-full bg-[#F49A5E] text-[#FFFBEA] py-2 
                rounded-xl font-bold hover:bg-[#EB9358] transition"
              >
                CHECK!
              </button>
            </Link>

            {/* new class button */}
            <div className="flex justify-center">
              <button
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
            {data.map((item, index) => (
              <StudentList key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
