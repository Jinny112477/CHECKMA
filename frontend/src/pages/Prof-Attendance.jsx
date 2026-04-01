import { useEffect, useRef, useState } from "react";
import { 
  ArrowLeft,
  ClipboardList,
  ShieldPlus
 } from "lucide-react";
import { Link } from "react-router-dom";
import StudentList from "../components/StudentList";
import { useAuth } from "../context/AuthContext";

export default function AttendanceProf() {
  // เปลี่ยน const data เป็น useState
  const [data, setData] = useState([
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740000" },
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740001" },
    { firstname: "Vidsava", surname: "Thammasat", student_id: "6710740002" },
  ]);

  // ใน JSX เพิ่ม onDelete prop
  {data.map((item, index) => (
    <StudentList
      key={item.student_id}
      {...item}
      onDelete={() => setData(data.filter((_, i) => i !== index))}
    />
  ))}

  {/*
  const handleDelete = async (studentId) => {
    // 1. เอาออก UI ก่อนทันที
    setData(data.filter((s) => s.student_id !== studentId));
    // 2. แล้วค่อยลบใน database
    await fetch(`/api/students/${studentId}`, { method: "DELETE" });
  };

  // ใน map:
  <StudentList
    key={item.student_id}
    {...item}
    onDelete={() => handleDelete(item.student_id)}
  /> 
  */}

  const classCode = "7DXC31G"; //Temp

  const number = data.length;
  const { profile } = useAuth();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#FFFBEA]">
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
              SF321
            </h1>
            <Link to="/prof/dashboard" className="ml-auto">
              <button className="
                  w-12 h-12 rounded-full
                  bg-[#F49A5E]
                  flex items-center justify-center
                  hover:scale-105 transition">
                <ClipboardList 
                size={28} className="text-white"/>
              </button>
            </Link>
          </div>

          <p className="mt-3 text-sm text-white font-medium">
              Data Communication and Computer Network 1<br />
              Section 760001
          </p>
        </div>
        
        <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-8 flex flex-col">

          <div className="bg-[#7C95CF] rounded-xl px-5 py-3 flex items-center shadow 
             gap-2 text-sm font-semibold text-white">
            <ShieldPlus size={16}/>
            Class Code
            <div className="bg-white rounded-lg flex-1 text-base text-[#4969B2] font-bold
              flex items-center justify-center py-1">
              {classCode}
            </div>
          </div>

          {/* Student list header (and number of student) */}
          <div className="flex items-center my-8">
            <div>
              <div className="text-[#4969B2] text-2xl font-bold">Student Lists</div>
              <div className="text-[#9DB2E3] text-sm font-medium">Total <span className="text-[#4969B2] font-bold">{number}</span> Students</div>
            </div>
            <Link to="/prof/signal" className="ml-auto">
              <button
                className="w-full bg-[#F49A5E] text-[#FFFBEA] px-8 py-2
                rounded-xl font-bold hover:bg-[#EB9358] transition"
              >
                CHECK!
              </button>
          </Link>
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