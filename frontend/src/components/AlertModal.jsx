import { X } from "lucide-react";
import { Check } from "lucide-react";

export default function AlertModal({
  open,
  onClose,
  title = "Alert!",
  description = "",
  type = "info",
  confirmText = "OK",
  cancelText,
  onConfirm,
  onCancel,
  successOnly = false,
}) {
  if (!open) return null;

  const styles = {
    info: {
      glow: "rgba(73,105,178,0.18)",
      button: "bg-[#4969B2] hover:bg-[#3A5490]",
      softBg: "bg-[#4969B2]/60",
    },
    success: {
      glow: "rgba(103,178,123,0.18)",
      button: "bg-[#67B27B] hover:bg-[#5AA86A]",
      softBg: "bg-[#88DDA1]/60",
    },
    danger: {
      glow: "rgba(228,77,60,0.18)",
      button: "bg-[#E44D3C] hover:bg-[#CC4436]",
      softBg: "bg-[#FF8B7E]/60",
    },
  };

  const current = styles[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      <div
        className="relative z-10 bg-white rounded-2xl p-6 w-[360px] text-center"
        style={{
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.10),
            0 2px 6px rgba(0,0,0,0.05),
            0 0 20px ${current.glow},
            inset 0 0 0 1px rgba(255,255,255,0.6)
          `,
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div className="relative flex justify-center mb-4">

          {/* 🌫️ ฟุ้งนอก */}
          <div
            className={`
              absolute w-22 h-22 rounded-full
              ${current.softBg}
              opacity-30 blur-3xl scale-125
              pointer-events-none
            `}
          />

          {/* 🌫️ ฟุ้งกลาง */}
          <div
            className={`
              absolute w-20 h-20 rounded-full
              ${current.softBg}
              opacity-50 blur-xl
              pointer-events-none
            `}
          />

          {/* 🔵 วงหลัก */}
          <div
            className={`
              relative w-16 h-16 rounded-full flex items-center justify-center
              ${current.softBg}
              shadow-inner
            `}
          >
            <img
              src="/NongCheck.svg"
              alt="nongcheck"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-500 mb-4 text-sm">{description}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          {!(type === "success" && successOnly) && (
            <div className="flex justify-center gap-3">
              {cancelText && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                >
                  {cancelText}
                </button>
              )}

              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg text-white ${current.button}`}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/**
 * 🔔 AlertModal Component
 *
 * ใช้สำหรับ popup แจ้งเตือน (info / success / danger)
 *
 * -------------------------------
 * ✅ วิธีใช้งาน
 * -------------------------------
 *
 * 1. import component
 * import AlertModal from "../components/AlertModal";
 *
 * 2. สร้าง state ควบคุมการเปิด/ปิด
 * const [open, setOpen] = useState(false);
 *
 * 3. เรียกใช้งาน
 *
 * <AlertModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *
 *   // 📝 ข้อความ
 *   title="Delete Item"
 *   description="Are you sure you want to delete?"
 *
 *   // 🎨 ประเภท (info | success | danger)
 *   type="danger"
 *
 *   // 🔘 ปุ่ม
 *   confirmText="Delete"
 *   cancelText="Cancel" // ❗ ถ้าไม่ใส่ = จะมีปุ่มเดียว (ไม่ใส่ได้)
 *
 *   // ⚡ event
 *   onConfirm={() => {
 *     console.log("confirm");
 *     setOpen(false);
 *   }}
 *   onCancel={() => setOpen(false)}
 * />
 *
 * -------------------------------
 * 🎯 Props
 * -------------------------------
 *
 * open          : boolean  → เปิด/ปิด modal
 * onClose       : function → ปิด modal (ปุ่ม X)
 * title         : string   → หัวข้อ
 * description   : string   → รายละเอียด
 * type          : "info" | "success" | "danger"
 * confirmText   : string   → ข้อความปุ่มหลัก
 * cancelText    : string   → (optional) ปุ่มรอง
 * onConfirm     : function → action ปุ่มหลัก
 * onCancel      : function → action ปุ่มรอง
 *
 * -------------------------------
 * เอาไปอยู่กับ <div> เดียวกับปุ่มที่จะใช้มันได้เลย
 */