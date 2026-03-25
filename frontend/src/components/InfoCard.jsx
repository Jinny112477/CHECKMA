import {CircleUser} from "lucide-react";

export default function InfoCard({
  firstname = "Vidsava",
  surname = "Thammasat",
  student_id = "6710740000"
}) {

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
    </div>
  );
}