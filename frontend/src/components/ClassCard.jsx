export default function ClassCard({
  classNum = "Class1",
  date = "19/01/2026"
}) {

  return (
    <div className="bg-[#FFEB83] rounded-3xl px-5 py-3 flex items-center shadow">

      <div className="text-[#4969B2] text-xl font-bold">
        {classNum}
      </div>

      <div className="text-sm text-[#4969B2] font-semibold ml-auto bg-white px-3 py-1 rounded-lg">
        {date}
      </div>
    </div>
  );
}