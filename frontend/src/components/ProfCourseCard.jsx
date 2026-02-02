import {
  Settings2,
  User,
  MapPin,
  Clock,
  CalendarDays,
} from "lucide-react";

export default function CourseCard({
  code,
  section,
  name,
  teacher,
  room,
  time,
  day,
  onSetting,
}) {
  return (
    <div className="relative bg-[#FFEB83] rounded-2xl p-4 shadow space-y-3">

      {/* setting button */}
      <button
        onClick={onSetting}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/60 transition"
      >
        <Settings2 size={24} className="text-[#4F6DB8]" />
      </button>

      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
          <img src="/NongCheck.svg" className="w-8 h-8" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#4F6DB8] text-[30px]">
              {code}
            </h3>
            <span className="bg-white px-2 py-0.5 rounded-md text-sm font-bold text-[#4F6DB8]">
              {section}
            </span>
          </div>

          <p className="text-[12px] text-[#4F6DB8] leading-snug">
            {name}
          </p>
        </div>
      </div>

      {/* teacher */}
      <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2">
        <User size={16} className="text-[#4F6DB8]" />
        <span className="text-sm font-medium text-[#4F6DB8]">
          {teacher}
        </span>
      </div>

      {/* bottom info */}
      <div className="grid grid-cols-3 gap-2 text-xs text-[#4F6DB8]">
        <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center">
          <MapPin size={14} /> {room}
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center">
          <Clock size={14} /> {time}
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg px-2 py-1 justify-center">
          <CalendarDays size={14} /> {day}
        </div>
      </div>
    </div>
  );
}