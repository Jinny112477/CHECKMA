import { ArrowLeft, DoorOpen } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertModal from "../components/AlertModal";


export default function JoinStudent() {
    const [sessionCode, setSessionCode] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    // ALERT
    const [alertConfig, setAlertConfig] = useState({
        open: false, title: "", description: "", type: "info",
        });
        const closeAlert = () => setAlertConfig((prev) => ({ ...prev, open: false }));

    // POST: join class handler
    const handleJoin = async () => {
        try {
            if (!sessionCode) {
            setAlertConfig({ open: true, title: "Oops!", description: "Please enter class code.", type: "info" });
            return;
            }

            const res = await fetch(`${API_URL}/api/participants/join-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_code: sessionCode, user_id: user.id }),
            });

            const data = await res.json();

            if (!res.ok) {
            setAlertConfig({ open: true, title: "Failed", description: data.error, type: "danger" });
            return;
            }

            console.log(data);
            setAlertConfig({ open: true, title: "Joined!", description: "You have joined the class successfully!", type: "success" });
        } catch (err) {
            console.error(err);
            setAlertConfig({ open: true, title: "Error", description: "Something went wrong.", type: "danger" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFEB83] font-quicksand px-4">
            {/* phone / app container */}
            <div
                className="
                    relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#FFEB83]
                    shadow-none sm:shadow-xl
                    px-6 pt-8 pb-8
                    flex flex-col
                    overflow-hidden
        "
            >
                {/* back arrow */}
                <Link
                    to="/student/home"
                    className="absolute top-6 left-6 text-[#9DB2E3]"
                >
                    <ArrowLeft size={32} />
                </Link>

                {/* title */}
                <div className="mt-12">
                    <h1 className="text-5xl font-bold text-[#4969B2]">Join class</h1>
                    <p className="mt-4 text-sm text-[#7C95CF] font-medium">
                        Ask your professor for the class code and enter it here!
                    </p>
                </div>

                {/* form area */}
                <div className="mt-8">
                    {/* blue box */}
                    <div className="bg-[#7C95CF] rounded-2xl p-4 sm:p-5">
                        {/* class code */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#FFFFFF] mb-1">
                                <DoorOpen size={16} />
                                Class code
                            </label>
                            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                <input
                                    type="text"
                                    placeholder="Enter the class code"
                                    value={sessionCode}
                                    onChange={(e) => setSessionCode(e.target.value.toUpperCase().slice(0, 6))}
                                    className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* join button (อยู่นอกกล่อง) */}
                <button
                    onClick={handleJoin}
                    disabled={!sessionCode}
                    className={`mt-8 w-full py-3 sm:py-4 rounded-2xl font-bold transition
                        ${sessionCode
                            ? "bg-[#4969B2] text-white hover:bg-[#3E5FA3]"
                            : "bg-[#9DB2E3] text-gray-500 cursor-not-allowed"
                        }
                    `}
                >
                    Join
                </button>

                <AlertModal
                    open={alertConfig.open}
                    onClose={closeAlert}
                    title={alertConfig.title}
                    description={alertConfig.description}
                    type={alertConfig.type}
                    confirmText="OK"
                    onConfirm={() => {
                        closeAlert();
                        if (alertConfig.type === "success") navigate("/student/home");
                    }}
                />
            </div>
        </div>
    );
}
