export default function AttendanceCard({
  classNum,
  date,
  time,
  status,
}) {
    const statusColor = {
    Present: "text-[#6BBF84]",
    Absent: "text-[#D45F52]",
    Late: "text-[#EAB308]",
  };


  return (
    <div className="bg-[#FFEB83] rounded-3xl px-5 py-3 flex items-center shadow">

      {/* LEFT: Class */}
      <div className="text-[#4969B2] text-xl font-bold">
        {classNum}
      </div>

      {/* RIGHT GROUP */}
      <div className="ml-auto flex items-center gap-4">

        {/* Date & Time */}
        <div className="text-right text-[#4969B2] font-semibold leading-tight">
          <div className="text-sm">{date}</div>
          <div className="text-sm">{time}</div>
        </div>

        {/* Status */}
        <div className="bg-white w-20 py-3 text-center rounded-2xl">
          <span className={`text-sm font-semibold ${statusColor[status]}`}>
            {status}
          </span>
        </div>

      </div>

    </div>
  );
}