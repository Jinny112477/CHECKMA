import { useEffect, useRef, useState } from "react";
import { ArrowLeft, House } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ClassCard from "../components/ClassCard";

export default function Dashboard() {
  const [classData, setClassData] = useState([]);

  const headerRef = useRef(null);
  const { session_id } = useParams();
  const hasClass = classData.length > 0;

  const API_URL = import.meta.env.VITE_API_URL;

  // GET: fetch class in session
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/classes/class-session/${session_id}`,
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch error:", text);
          return;
        }

        const data = await res.json();
        setClassData(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (session_id) fetchClass();
  }, [session_id]);

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
                to={`/prof/attendance/${session_id}`}
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

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 pt-[120px]">
          {/* ===== EMPTY STATE ===== */}
          {!hasClass && (
            <div
              className="flex flex-col items-center justify-center h-full text-center gap-4
                 animate-[fadeIn_0.6s_ease-out_forwards]"
            >
              <div
                className="w-48 h-48 rounded-full bg-[#9DB2E3]
                   flex items-center justify-center
                   animate-[scaleIn_0.6s_ease-out_forwards]"
              >
                <img src="/NongCheck.svg" alt="empty" className="w-40 h-40" />
              </div>

              <p className="text-[#FFFFFF] font-semibold text-lg">
                Create your first class!
              </p>
            </div>
          )}

          {/* ===== CLASS CARDS ===== */}
          {hasClass && (
            <div className="space-y-4 px-4">
              {classData.map((item) => (
                <Link
                  key={item.id}
                  to={`/prof/dashboard-info/${session_id}/${item.id}`}
                  state={item}
                  className="block"
                >
                  <ClassCard
                    classNum={item.class_name}
                    date={item.class_date}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
