import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleBack = async () => {
    console.log("handleBack fired");

    const res = await fetch(
      `${API_URL}/api/attendance/signal/${class_id}/cancel`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: profile.id }),
      },
    );

    const data = await res.json();
    console.log("Cancel response:", res.status, data); // 👈 what does this say?

    navigate(`/student/attendance/${session_id}`);
  };

  // POST: send signal
  useEffect(() => {
    console.log("Effect ran", {
      profileId: profile?.id,
      class_id,
      hasSent: hasSentRef.current,
    });

    if (!profile?.id || !class_id) return;
    if (hasSentRef.current) return;

    hasSentRef.current = true;

    const sendSignal = async () => {
      try {
        console.log("🚀 Sending signal...");

        const res = await fetch(
          `${API_URL}/api/attendance/signal/${class_id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: profile.id }),
          },
        );

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

    return () => {
      // Use sendBeacon for reliability on unmount — fetch gets cancelled by browser
      const payload = JSON.stringify({ user_id: profile.id });
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(
        `${API_URL}/api/attendance/signal/${class_id}/cancel`,
        blob,
      );
    };
  }, [profile?.id, class_id]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div className="relative w-full max-w-[390px] h-screen bg-[#4969B2] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-20 flex items-center justify-between px-5">
            <button onClick={handleBack} className="text-white">
              <ArrowLeft size={32} />
            </button>

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
              <p className="text-lg font-semibold">Sending signal...</p>
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
                <p className="text-lg font-semibold text-red-300">❌ Failed</p>
                <p className="text-sm mt-2 opacity-80">{message}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
