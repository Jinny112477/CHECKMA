import { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import IconProfile from "../components/IconProfile";

export default function EditProf() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime]     = useState("");
  const [day, setDay]             = useState("");
  const [selectedIcon, setSelectedIcon] = useState("CodeXml");
  const [showPicker, setShowPicker]     = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFEB83] font-quicksand px-4">
      <div
        className="
          relative
          w-full max-w-[390px]
          min-h-screen
          bg-[#FFEB83]
          shadow-none sm:shadow-xl
          px-6 pt-8 pb-8
          flex flex-col
          overflow-y-auto
        "
      >
        {/* back arrow */}
        <Link to="/prof/home" className="absolute top-6 left-6 text-[#9DB2E3]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div className="mt-12">
          <h1 className="text-5xl font-bold text-[#4969B2]">Edit course</h1>
          <p className="mt-4 text-sm text-[#7C95CF] font-medium">
            Edit your course information. Don’t forget to save.
          </p>
        </div>

        {/* form area */}
        <div className="mt-20 relative">

          {/* profile icon floating */}
          <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <IconProfile
                selectedIcon={selectedIcon}
                onSelect={setSelectedIcon}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
              />
              <button
                onClick={() => setShowPicker(true)}
                className="
                  absolute -bottom-1 -right-1
                  w-8 h-8 rounded-full bg-[#FFAC75]
                  flex items-center justify-center
                  hover:scale-105 transition
                "
              >
                <Pencil size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* blue box */}
          <div className="bg-[#7C95CF] rounded-2xl p-4 sm:p-5 pt-16">
            <div className="my-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-1">Class name</label>
              <div className="flex items-center bg-white rounded-xl font-semibold">
                <input type="text" placeholder="Name"
                  className="w-full px-4 py-3 outline-none bg-transparent placeholder:text-[#9DB2E3] placeholder:font-normal" />
              </div>
            </div>
            <div className="my-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Course code</label>
                <input type="text" placeholder="Code"
                  className="w-full px-4 py-3 rounded-xl bg-white outline-none placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Section</label>
                <input type="text" placeholder="Section"
                  className="w-full px-4 py-3 rounded-xl bg-white outline-none placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold" />
              </div>
            </div>
            <div className="my-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1 block">Start time</label>
                <div className="w-full bg-white rounded-xl overflow-hidden">
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                    className={`w-full min-w-0 block box-border appearance-none px-4 py-3 bg-transparent outline-none text-left ${startTime ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1 block">End time</label>
                <div className="w-full bg-white rounded-xl overflow-hidden">
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                    className={`w-full min-w-0 block box-border appearance-none px-4 py-3 bg-transparent outline-none text-left ${endTime ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`} />
                </div>
              </div>
            </div>
            <div className="my-4">
              <label className="text-sm font-semibold text-white mb-1 block">Day</label>
              <select value={day} onChange={(e) => setDay(e.target.value)}
                className={`w-full px-3 py-3 rounded-xl bg-white outline-none ${day ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`}>
                <option value="" disabled>Day</option>
                <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
                <option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-1">Room</label>
              <div className="flex items-center bg-white rounded-xl font-semibold">
                <input type="text" placeholder="Room"
                  className="w-full px-4 py-3 outline-none bg-transparent placeholder:text-[#9DB2E3] placeholder:font-normal" />
              </div>
            </div>
          </div>
        </div>

        <button className="mt-8 w-full bg-[#4969B2] text-white text-base py-3 sm:py-4 rounded-2xl font-bold hover:bg-[#3E5FA3] transition">
          Save
        </button>
      </div>
    </div>
  );
}