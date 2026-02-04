import { useState } from "react";
import {
    ArrowLeft,
    Pencil,
    CodeXml
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateProf() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [day, setDay] = useState("");


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFEB83] font-quicksand px-4">
            {/* phone / app container */}
            <div
                className="
          relative
          w-full max-w-[390px]
          min-h-screen sm:min-h-[844px]
          bg-[#FFEB83]
          rounded-none sm:rounded-[20px]
          shadow-none sm:shadow-xl
          px-6 pt-10 pb-8
          flex flex-col
        "
            >
                {/* back arrow */}
                <Link to="/prof/home" className="absolute top-6 left-6 text-[#9DB2E3]"> 
                    <ArrowLeft size={32} />
                </Link>

                {/* title */}
                <div className="mt-11">
                    <h1 className="text-5xl font-bold text-[#4969B2]">
                        Create class
                    </h1>
                    <p className="mt-3 text-sm text-[#7C95CF] font-light">
                        Create your class, enter your class information!
                    </p>
                </div>

                <div>
                    

                    {/* form area */}
                    <div className="mt-16 relative">
                        {/* profile image floating */}
                        <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-10">
                            <div className="relative">
                                {/* profile circle */}
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-8 border-[#7C95CF]">
                                    {/* แสดง element โปรไฟล์ที่เลือก */}
                                    <span className="text-[#F49A5E]"><CodeXml size={40} /></span>
                                </div>

                                {/* edit button */}
                                <button
                                className="
                                    absolute -bottom-1 -right-1
                                    w-8 h-8 rounded-full
                                    bg-[#F7A76C]
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

                            {/* course name */}
                            <div className="m-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#FFFFFF] mb-1">
                                    Class name
                                </label>
                                <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                    <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-3 py-3 outline-none bg-transparent
                                    placeholder:text-[#9DB2E3] placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            {/* course code + section */}
                            <div className="m-2 grid grid-cols-2 gap-3">
                                {/* course code */}
                                <div>
                                    <label className="text-sm font-semibold text-white mb-1 block">
                                        Course code
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Code"
                                    className="w-full px-4 py-3 rounded-xl bg-white outline-none
                                        placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                                    />
                                </div>

                                {/* section */}
                                <div>
                                    <label className="text-sm font-semibold text-white mb-1 block">
                                        Section
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Section"
                                    className="w-full px-4 py-3 rounded-xl bg-white outline-none
                                        placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                                    />
                                </div> 
                            </div>

                            {/* time picker */}
                            <div className="m-2 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-semibold text-white mb-1 block">
                                            Start time
                                    </label> 
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                                        className={`
                                            w-full px-4 py-3 rounded-xl bg-white outline-none
                                            ${startTime
                                            ? "text-black font-semibold"
                                            : "text-[#9DB2E3] font-normal"
                                            }
                                        `}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-white mb-1 block">
                                            End time
                                    </label> 
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                                        className={`
                                            w-full px-4 py-3 rounded-xl bg-white outline-none
                                            ${startTime
                                            ? "text-black font-semibold"
                                            : "text-[#9DB2E3] font-normal"
                                            }
                                        `}
                                    />
                                </div>
                            </div>

                            {/* day */}
                            <div className="m-2">
                                <label className="text-sm font-semibold text-white mb-1 block">
                                    Day
                                </label>
                                <select value={day} onChange={(e) => setDay(e.target.value)}
                                    className={`
                                        w-full px-4 py-3 rounded-xl bg-white outline-none
                                        ${day
                                        ? "text-black font-semibold"
                                        : "text-[#9DB2E3] font-normal"
                                        }
                                    `}
                                >
                                    <option value="" disabled selected>Day</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                            </div>

                            {/* room */}
                            <div className="m-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#FFFFFF] mb-1">
                                    Room
                                </label>
                                <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                    <input
                                    type="text"
                                    placeholder="Room"
                                    className="w-full px-3 py-3 outline-none bg-transparent
                                    placeholder:text-[#9DB2E3] placeholder:font-normal"
                                    />
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>

                {/* create button (อยู่นอกกล่อง) */}
                <button
                    className="mt-8 w-full bg-[#4969B2] text-white py-3 sm:py-4
                            rounded-2xl font-semibold hover:bg-[#3E5FA3] transition"
                >
                    Create
                </button>
            </div>
        </div>
    );
}