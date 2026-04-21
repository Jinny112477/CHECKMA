import { CircleUser, Check, AlarmClock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignalCard({
  firstname,
  surname,
  student_id,
  class_id,
  onComplete,
}) {
  const [status, setStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const { profile } = useAuth();

  const handleAttendance = async (statusType) => {
    try {
      const res = await fetch(`${API_URL}/api/attend/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: profile.id,
          class_id,
          status: statusType,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus(statusType);

      // ✅ ONLY remove card when needed
      if (statusType === "Present" || statusType === "Absent") {
        onComplete?.(student_id);
      }

      console.log("Saved:", data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="bg-[#FFF4BE] rounded-xl px-5 py-3 flex items-center shadow">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <CircleUser className="w-full h-full text-[#4969B2]" />
      </div>

      <div className="text-sm ml-2">
        <div className="text-[#4969B2] font-bold">{student_id}</div>
        <div className="text-[#7C95CF] font-semibold">
          {firstname} {surname}
        </div>
      </div>

      {/* Late */}
      <button
        onClick={() => handleAttendance("Late")}
        className="w-10 h-10 rounded-lg ml-auto bg-[#EAB308]
        flex items-center justify-center hover:scale-105 transition"
      >
        <AlarmClock className="text-white" />
      </button>

      {/* Present */}
      <button
        onClick={() => handleAttendance("Present")}
        className="w-10 h-10 rounded-lg ml-2 bg-[#6BBF84]
        flex items-center justify-center hover:scale-105 transition"
      >
        <Check className="text-white" />
      </button>
    </div>
  );
}
