export default function AttendanceCard({
  className = "Class 1",
  date = "19/01/2026",
  time = "13.30",
  status = "Present",
}) {
    const statusColor = {
    Present: "text-[#6BBF84]",
    Absent: "text-red-400",
    Late: "text-yellow-500",
  };


  return (
    <div className="bg-[#FFEB83] rounded-[40px] px-8 py-6 flex items-center shadow">

      {/* LEFT: Class */}
      <div className="text-[#4969B2] text-4xl font-bold">
        {className}
      </div>

      {/* RIGHT GROUP */}
      <div className="ml-auto flex items-center gap-6">

        {/* Date & Time */}
        <div className="text-right text-[#4969B2] font-semibold leading-tight">
          <div className="text-2xl">{date}</div>
          <div className="text-xl">{time}</div>
        </div>

        {/* Status */}
        <div className="bg-white px-10 py-3 rounded-2xl">
          <span className={`text-2xl font-semibold ${statusColor[status]}`}>
            {status}
          </span>
        </div>

      </div>

    </div>
  );
}