import { CircleUser, Check, AlarmClock } from "lucide-react";
import { useState, useEffect } from "react";

export default function SignalCard({
  firstname,
  surname,
  student_id,
  user_uuid,
  class_id,
  onComplete,
}) {
  const [status, setStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // if already check display status only
  const handleAttendance = async (statusType) => {
    console.log("Sending:", {
      user_id: user_uuid,
      class_id,
      status: statusType,
    });
    try {
      const res = await fetch(`${API_URL}/api/attend/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_uuid,
          class_id,
          status: statusType,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus(statusType);

      if (statusType === "Present" || statusType === "Absent") {
        onComplete?.(student_id);
      }

      console.log("Saved:", data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Check if already checked in
  useEffect(() => {
    if (!user_uuid || !class_id) return;

    const checkExisting = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/attend/check-in/status/${class_id}/${user_uuid}`,
        );
        const data = await res.json();
        if (data?.status) setStatus(data.status); // 👈 pre-fill if exists
      } catch (err) {
        console.error(err);
      }
    };

    checkExisting();
  }, [user_uuid, class_id]);

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

      {/* Show status text after action, buttons before */}
      {status ? (
        <span
          className={`ml-auto text-sm font-bold ${
            status === "Present"
              ? "text-[#6BBF84]"
              : status === "Late"
                ? "text-[#EAB308]"
                : "text-[#D45F52]"
          }`}
        >
          {status} ✓
        </span>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
