import {CircleUser} from "lucide-react";

export default function InfoCard({
  firstname = "Vidsava",
  surname = "Thammasat",
  student_id = "6710740000",
  time = "13.30",
  status = "Present"
}) {

  const statusColor = {
    Present: "text-[#6BBF84]",
    Absent: "text-[#D45F52]",
    Late: "text-[#EAB308]",
  };

  return (
    <div className="bg-[#FFEB83] rounded-3xl px-5 py-3 flex items-center shadow">

      {/* profile image */}
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <CircleUser className="w-full h-full text-[#4969B2]"/>
      </div>

      <div className="text-sm ml-4">
        <div className="text-[#4969B2] font-bold">{student_id}</div>
        <div className="text-[#7C95CF] font-semibold">{firstname} {surname}</div>
      </div>

      <div className="text-xs ml-auto text-right">
        <div className="text-[#4969B2] font-medium">{time}</div>
        <div className={`bg-white px-2 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>{status}</div>
      </div>
    </div>
  );
}