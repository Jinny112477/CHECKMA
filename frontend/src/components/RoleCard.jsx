import { Check } from "lucide-react";

export default function RoleCard({
  active,
  onClick,
  label,
  bg,
  hoverBg,
  activeBg,
  border,
  textColor,
  imagePath,
}) {
  const isStudent = label === "STUDENT";
  const isProfessor = label === "PROFESSOR";

  return (
    <button
      onClick={onClick}
      className={`
        group
        relative w-full rounded-2xl p-6
        flex items-center
        transition-colors duration-300
        ${active ? activeBg : bg}
        ${
          active
            ? `border-4 ${border} shadow-lg`
            : `hover:${hoverBg} border-4 border-transparent`
        }
      `}
    >
      {/* image */}
      <div className="relative w-[48px] h-[48px] flex-shrink-0">
        <img
          src={imagePath}
          alt={`${label} image`}
          className={`
            absolute inset-0
            w-full h-full object-contain
            transition-transform duration-300
            ${active ? "scale-150" : "group-hover:scale-130"}
          `}
        />
      </div>

      {/* text */}
      <div
        className={`
          ml-4 flex flex-col items-center
          transition-colors duration-300
          ${
            isStudent
              ? active
                ? "text-[#4969B2]"
                : "text-white"
              : active
              ? "text-[#FFEB83]"
              : `${textColor} group-hover:text-white`
          }
        `}
      >
        {/* I'm a */}
        <p
          className={`
            text-sm transition-colors duration-300
            ${
              active
                ? isStudent
                  ? "text-[#95A9D7]"
                  : "text-[#FFF4BE]"
                : "opacity-80"
            }
            ${isStudent ? "translate-x-1" : ""}
          `}
        >
          I'm a
        </p>

        {/* label */}
        <p
          className={`
            font-bold leading-tight
            ${
              isStudent
                ? "text-xl -translate-x-[-10px]"
                : "text-xl"
            }
          `}
        >
          “{label}”
        </p>
      </div>

      {/* check */}
      {active && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
            <Check
              size={25}
              strokeWidth={4}
              className="text-[#4CAF50]"
            />
          </div>
        </div>
      )}
    </button>
  );
}