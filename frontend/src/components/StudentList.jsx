import { CircleUser } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function StudentList({
  firstname = "Vidsava",
  surname = "Thammasat",
  student_id = "6710740000",
  onDelete,
}) {
  const cardRef = useRef(null);
  const startXRef = useRef(0);
  const [swiped, setSwiped] = useState(false);
  const [ctxMenu, setCtxMenu] = useState({ visible: false, x: 0, y: 0 });

  // ปิด context menu เมื่อคลิกที่อื่น
  useEffect(() => {
    const close = () => setCtxMenu((m) => ({ ...m, visible: false }));
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // --- Touch (mobile) ---
  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - startXRef.current;
    if (dx < 0) {
      cardRef.current.style.transform = `translateX(${Math.max(dx, -80)}px)`;
      cardRef.current.style.transition = "none";
    } else if (swiped) {
      // ปัดกลับขวา
      const offset = Math.min(-80 + dx, 0);
      cardRef.current.style.transform = `translateX(${offset}px)`;
      cardRef.current.style.transition = "none";
    }
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startXRef.current;
    cardRef.current.style.transition = "transform 0.2s ease";
    if (!swiped && dx < -20) {
      cardRef.current.style.transform = "translateX(-80px)";
      setSwiped(true);
    } else if (swiped && dx > 20) {
      cardRef.current.style.transform = "translateX(0)";
      setSwiped(false);
    } else if (!swiped) {
      cardRef.current.style.transform = "translateX(0)";
    } else {
      cardRef.current.style.transform = "translateX(-80px)";
    }
  };

  // --- Mouse drag (desktop fallback) ---
  const handleMouseDown = (e) => {
    startXRef.current = e.clientX;
  };
  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const dx = e.clientX - startXRef.current;
    if (!swiped && dx < 0) {
      cardRef.current.style.transition = "none";
      cardRef.current.style.transform = `translateX(${Math.max(dx, -80)}px)`;
    } else if (swiped && dx > 0) {
      cardRef.current.style.transition = "none";
      const offset = Math.min(-80 + dx, 0);
      cardRef.current.style.transform = `translateX(${offset}px)`;
    }
  };
  const handleMouseUp = (e) => {
    const dx = e.clientX - startXRef.current;
    cardRef.current.style.transition = "transform 0.2s ease";
    if (!swiped && dx < -40) {
      cardRef.current.style.transform = "translateX(-80px)";
      setSwiped(true);
    } else if (swiped && dx > 40) {
      cardRef.current.style.transform = "translateX(0)";
      setSwiped(false);
    } else if (!swiped) {
      cardRef.current.style.transform = "translateX(0)";
    } else {
      cardRef.current.style.transform = "translateX(-80px)";
    }
  };

  // --- Right-click → custom context menu (ข้อ 1) ---
  const handleContextMenu = (e) => {
    e.preventDefault();
    setCtxMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden">
        {/* Red delete bg */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 bg-red-500
                     flex items-center justify-center rounded-3xl cursor-pointer"
          onClick={onDelete}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          style={{ transform: "translateX(0)", transition: "transform 0.2s ease" }}
          className="bg-[#FFEB83] rounded-3xl px-5 py-3 flex items-center shadow
                      relative z-10 select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <CircleUser className="w-full h-full text-[#4969B2]" />
          </div>
          <div className="text-sm ml-4">
            <div className="text-[#4969B2] font-bold">{student_id}</div>
            <div className="text-[#7C95CF] font-semibold">{firstname} {surname}</div>
          </div>
        </div>
      </div>

      {/* Custom context menu (ข้อ 1) — อยู่นอก overflow-hidden */}
      {ctxMenu.visible && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-lg py-1 px-1 min-w-[130px]"
          style={{ top: ctxMenu.y, left: ctxMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
                       text-red-500 font-semibold text-sm hover:bg-gray-100 transition"
            onClick={() => {
              setCtxMenu({ visible: false, x: 0, y: 0 });
              onDelete?.();
            }}
          >
            🗑 Delete
          </button>
        </div>
      )}
    </>
  );
}