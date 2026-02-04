import {
    ArrowLeft,
    DoorOpen
} from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinStudent() {
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
                <Link to="/student/home" className="absolute top-6 left-6 text-[#9DB2E3]">
                    <ArrowLeft size={32} />
                </Link>

                {/* title */}
                <div className="mt-11">
                    <h1 className="text-5xl font-bold text-[#4969B2]">
                        Join class
                    </h1>
                    <p className="mt-3 text-sm text-[#7C95CF] font-light">
                        Ask your professor for the class code and enter it here!
                    </p>
                </div>


                {/* form area */}
                <div className="mt-8">
                    {/* blue box */}
                    <div className="bg-[#7C95CF] rounded-2xl p-4 sm:p-5">

                        {/* class code */}
                        <div className="m-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#FFFFFF] mb-1">
                                <DoorOpen size={16} />
                                Class code
                            </label>
                            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                <input
                                type="text"
                                placeholder="Enter the class code"
                                className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* join button (อยู่นอกกล่อง) */}
                <button
                    className="mt-8 w-full bg-[#4969B2] text-white py-3 sm:py-4
                            rounded-2xl font-semibold hover:bg-[#3E5FA3] transition"
                >
                    Join
                </button>
            </div>
        </div>
    );
}