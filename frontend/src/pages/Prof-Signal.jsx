import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import SignalCard from "../components/SignalCard";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

export default function SignalProf() {
  const { profile, signals, fetchSignals } = useAuth();

  const [localSignals, setLocalSignals] = useState([]);

  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);

  const { session_id, class_id } = useParams();
  const socket = io(import.meta.env.VITE_API_URL);

  // Set Signals
  useEffect(() => {
    setLocalSignals(signals);
  }, [signals]);

  // GET: fetch signal
  useEffect(() => {
    if (!class_id) return;

    fetchSignals(class_id);

    // listen for signal updates from backend
    socket.on(`signals:${class_id}`, () => {
      console.log("📡 Socket event received, refetching...");
      fetchSignals(class_id);
    });

    return () => {
      socket.off(`signals:${class_id}`);
    };
  }, [class_id]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div className="relative w-full max-w-[390px] h-screen bg-[#4969B2] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-20 flex items-center justify-between px-5">
            <Link to={`/prof/attendance/${session_id}`} className="text-white">
              <ArrowLeft size={32} />
            </Link>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

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

        {/* GIF */}
        <div className="flex justify-center">
          <img
            src="/NongCheckgif.GIF"
            alt="NongCheckgif"
            className="w-56 h-56"
          />
        </div>

        {/* SIGNAL CARDS */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {localSignals.length === 0 ? (
            <p className="text-white text-center">Waiting for students...</p>
          ) : (
            localSignals.map((signal) => (
              <SignalCard
                key={signal.id}
                firstname={signal.users.student_info?.firstname}
                surname={signal.users.student_info?.surname}
                student_id={signal.users.student_info?.student_id}
                session_id={signal.session_id}
                class_id={signal.class_id}
                onComplete={(user_id) => {
                  setLocalSignals((prev) =>
                    prev.filter((s) => s.user_id !== user_id),
                  );
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
