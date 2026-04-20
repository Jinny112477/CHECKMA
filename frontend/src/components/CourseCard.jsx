import {
  User,
  MapPin,
  Clock,
  CalendarDays
} from "lucide-react";
import { Link } from "react-router-dom";
import { resolveIcon } from "./IconProfile.jsx"; 

export default function CourseCard({
  icon,
  code,
  section,
  name,
  teacher,
  room,
  time,
  day,
}) {

  const Icon = resolveIcon(icon);
  
  return (
    <Link to="/student/attendance" className="block">
      <div className="relative bg-[#FFEB83] rounded-2xl p-4 shadow space-y-4">

        {/* header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
            {Icon ? <Icon size={28} className="text-[#F49A5E]" /> : <User size={28} />}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#4F6DB8] text-3xl">
                {code}
              </h3>
              <span className="bg-white px-2 py-0.5 rounded-md text-sm font-bold text-[#4969B2]">
                {section}
              </span>
            </div>

            <p className="text-xs text-[#4969B2] font-medium leading-snug">
              {name}
            </p>
          </div>
        </div>

        {/* teacher */}
        <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2">
          <User size={16} className="text-[#4969B2]" />
          <span className="text-sm font-bold text-[#4969B2]">
            {teacher}
          </span>
        </div>

        {/* bottom info */}
        <div className="grid grid-cols-3 gap-2 text-xs text-[#4969B2]">
          <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center font-medium">
            <MapPin size={14} /> {room}
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center font-medium">
            <Clock size={14} /> {time}
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center font-medium">
            <CalendarDays size={14} /> {day}
          </div>
        </div>
      </div>
    </Link>
  );
}