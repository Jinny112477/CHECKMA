import {
  CodeXml,
  Atom,
  BookOpen,
  Radical,
  Scale,
  Globe,
  FlaskConical,
  Calculator,
  Music,
  Palette,
  Microscope,
  Landmark,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";

export const ICONS = [
  { name: "CodeXml",      component: CodeXml },
  { name: "Atom",         component: Atom },
  { name: "BookOpen",     component: BookOpen },
  { name: "Radical",      component: Radical },
  { name: "Scale",        component: Scale },
  { name: "Globe",        component: Globe },
  { name: "FlaskConical", component: FlaskConical },
  { name: "Calculator",   component: Calculator },
  { name: "Music",        component: Music },
  { name: "Palette",      component: Palette },
  { name: "Microscope",   component: Microscope },
  { name: "Landmark",     component: Landmark },
];

/** แปลง iconName (string) → React component */
export function resolveIcon(name) {
  return ICONS.find((i) => i.name === name)?.component ?? CodeXml;
}

/**
 * IconProfile
 * Props:
 *  - selectedIcon  : string  ชื่อไอคอนที่เลือก
 *  - onSelect      : (name: string) => void  callback เมื่อเลือกไอคอนใหม่
 *  - showPicker    : boolean
 *  - setShowPicker : (boolean) => void
 *  - size          : number (default 40) ขนาดไอคอนในวงกลมโปรไฟล์
 *  - circleSize    : string tailwind class (default "w-24 h-24")
 *  - borderClass   : string tailwind class (default "border-8 border-[#7C95CF]")
 *  - showEditBtn   : boolean (default true)
 */
export default function IconProfile({
  selectedIcon,
  onSelect,
  showPicker,
  setShowPicker,
  size = 40,
  circleSize = "w-24 h-24",
  borderClass = "border-8 border-[#7C95CF]",
  showEditBtn = true,
}) {
  const CurrentIcon = resolveIcon(selectedIcon);

  return (
    <>
      {/* ── profile circle ── */}
      <div className={`${circleSize} rounded-full bg-white flex items-center justify-center ${borderClass}`}>
        <CurrentIcon size={size} className="text-[#F49A5E]" />
      </div>

      {/* ── icon picker modal ── */}
      {showPicker && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setShowPicker(false)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* bottom sheet */}
          <div
            className="relative w-full max-w-[390px] bg-white rounded-t-3xl px-6 pt-5 pb-10 z-10"
            style={{ animation: "slideUp 0.25s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* handle bar */}
            <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-4" />

            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[#4969B2] font-bold text-lg">Choose Icon</span>
              <button
                onClick={() => setShowPicker(false)}
                className="w-8 h-8 rounded-full bg-[#F0F4FF] flex items-center justify-center"
              >
                <X size={16} className="text-[#4969B2]" />
              </button>
            </div>

            {/* icon grid */}
            <div className="grid grid-cols-4 gap-4">
              {ICONS.map(({ name, component: Icon }) => (
                <button
                  key={name}
                  onClick={() => {
                    onSelect(name);
                    setShowPicker(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition
                    ${selectedIcon === name
                      ? "bg-[#4969B2] shadow-md scale-105"
                      : "bg-[#F0F4FF] hover:bg-[#dce6ff]"
                    }`}
                >
                  <Icon
                    size={32}
                    className={selectedIcon === name ? "text-white" : "text-[#F49A5E]"}
                  />
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight ${
                      selectedIcon === name ? "text-white" : "text-[#7C95CF]"
                    }`}
                  >
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      , document.body)}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}