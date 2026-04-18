import { useState, useRef, useEffect } from "react";
import {
  Ellipsis,
  User,
  MapPin,
  Clock,
  CalendarDays,
  CodeXml,
  Settings,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { resolveIcon } from "./IconProfile.jsx"; 

export default function ProfCourseCard({
  icon,
  code,
  section,
  name,
  teacher,
  room,
  time,
  day,
  onSetting,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const Icon = resolveIcon(icon);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleSettingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSetting) onSetting();
    navigate("/prof/edit-course");
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <Link to="/prof/attendance" className="block relative z-0">
      <div className="relative bg-[#FFEB83] rounded-2xl p-4 shadow">
        <button
          onClick={handleToggleMenu}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/60 transition z-10"
        >
          <Ellipsis size={24} className="text-[#4969B2]" />
        </button>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute top-11 right-3 flex flex-col gap-2 z-20"
          >
            <button
              onClick={handleSettingClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB788] text-white font-semibold rounded-xl shadow transition text-base"
            >
              <Settings size={16} /> Setting
            </button>

            <button
              onClick={handleDeleteClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB788] text-[#B9382A] font-semibold rounded-xl shadow transition text-base"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <Icon size={28} className="text-[#F49A5E]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#4969B2] text-3xl">{code}</h3>
                <span className="bg-white px-2 py-0.5 rounded-md text-sm font-bold text-[#4969B2]">
                  {section}
                </span>
              </div>

              <p className="text-xs text-[#4969B2] font-medium leading-snug">
                {name}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2">
            <User size={16} className="text-[#4969B2]" />
            <span className="text-sm font-bold text-[#4969B2]">{teacher}</span>
          </div>

          {/* bottom info */}
          <div className="grid grid-cols-[1.2fr_1.4fr_1fr] h-8 gap-2 text-xs text-[#4969B2]">
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
      </div>
    </Link>
  );
}