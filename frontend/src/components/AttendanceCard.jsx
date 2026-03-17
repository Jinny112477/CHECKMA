export default function AttendanceCard({
  classNum = "Class 1",
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
    <div className="bg-[#FFEB83] rounded-3xl px-5 py-3 flex items-center shadow">

      {/* LEFT: Class */}
      <div className="text-[#4969B2] text-xl font-bold">
        {classNum}
      </div>

      {/* RIGHT GROUP */}
      <div className="ml-auto flex items-center gap-6">

        {/* Date & Time */}
        <div className="text-right text-[#4969B2] font-semibold leading-tight">
          <div className="text-sm">{date}</div>
          <div className="text-sm">{time}</div>
        </div>

        {/* Status */}
        <div className="bg-white px-5 py-3 rounded-2xl">
          <span className={`text-sm font-semibold ${statusColor[status]}`}>
            {status}
          </span>
        </div>

      </div>

    </div>
  );
}