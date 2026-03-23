import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import StudentList from "../components/StudentList";
import { supabase } from "../lib/supabaseClient";

export default function AttendanceProf() {
  const [profile, setProfile] = useState(null);
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";

  const headerRef = useRef(null);

  //fetch User profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("SESSION:", session);

        if (!session) {
          console.log("No session found");
          return;
        }

        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        console.log("STATUS:", res.status);

        const data = await res.json();
        console.log("API RESPONSE:", data);

        setProfile(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
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

      </div>
    </div>
  );
}