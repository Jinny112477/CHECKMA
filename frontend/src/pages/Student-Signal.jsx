import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignalStudent() {
  const { profile } = useAuth();
  const avatar = profile?.avatar_url || "/NongCheckprofile.png";
  const headerRef = useRef(null);

  const { session_id, class_id } = useParams();

  const [status, setStatus] = useState("loading"); 
  // loading | success | error

  const [message, setMessage] = useState("");

  const hasSentRef = useRef(false); // prevent double send

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!profile?.id || !class_id || hasSentRef.current) return;

    hasSentRef.current = true;

    const sendSignal = async () => {
      try {
        console.log("🚀 Sending signal...");
        console.log("class_id:", class_id);
        console.log("user_id:", profile.id);

        const res = await fetch(
          `${API_URL}/api/attendance/signal/${class_id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: profile.id,
            }),
          }
        );

        console.log("📡 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Response data:", data);

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Signal sent successfully");
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to send signal");
        }

      } catch (err) {
        console.error("🔥 Fetch error:", err);
        setStatus("error");
        setMessage("Network error");
      }
    };

    sendSignal();
  }, [profile, class_id]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div className="relative w-full max-w-[390px] h-screen bg-[#4969B2] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-20 flex items-center justify-between px-5">
            <Link to={`/student/attendance/${session_id}`} className="text-white">
              <ArrowLeft size={32} />
            </Link>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

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

        {/* CONTENT */}
        <div className="flex flex-col items-center justify-center flex-1 gap-6">

          <img
            src="/NongCheckgif.GIF"
            alt="NongCheckgif"
            className="w-56 h-56"
          />

          {/* STATUS */}
          <div className="text-white text-center px-6">
            {status === "loading" && (
              <p className="text-lg font-semibold">
                Sending signal...
              </p>
            )}

            {status === "success" && (
              <>
                <p className="text-lg font-semibold text-green-300">
                  ✅ Signal Sent
                </p>
                <p className="text-sm mt-2 opacity-80">{message}</p>
              </>
            )}

            {status === "error" && (
              <>
                <p className="text-lg font-semibold text-red-300">
                  ❌ Failed
                </p>
                <p className="text-sm mt-2 opacity-80">{message}</p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}