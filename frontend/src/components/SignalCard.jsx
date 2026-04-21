import {
  CircleUser,
  Check,
  AlarmClock
} from "lucide-react";
import { useState } from "react";


export default function SignalCard({
  firstname,
  surname,
  student_id
}) {

  const [status, setStatus] = useState("");

  return (
    <div className="bg-[#FFF4BE] rounded-xl px-5 py-3 flex items-center shadow">

      {/* profile image */}
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <CircleUser className="w-full h-full text-[#4969B2]"/>
      </div>

      <div className="text-sm ml-2">
        <div className="text-[#4969B2] font-bold">{student_id}</div>
        <div className="text-[#7C95CF] font-semibold">{firstname} {surname}</div>
      </div>

      <button onClick={() => setStatus("Late")} 
        className="w-10 h-10 rounded-lg ml-auto
        bg-[#EAB308]
          flex items-center justify-center
          hover:scale-105 transition"><AlarmClock className="text-white"/>
      </button>
      
      <button onClick={() => setStatus("Present")}
        className="w-10 h-10 rounded-lg ml-2
        bg-[#6BBF84]
          flex items-center justify-center
          hover:scale-105 transition"><Check className="text-white"/>
      </button>
    </div>
  );
}