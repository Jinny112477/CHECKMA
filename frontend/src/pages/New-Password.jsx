import { useState } from "react";
import {
    ArrowLeft,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">

            {/* phone / app container */}
            <div
                className="
          relative
          w-full max-w-[390px]
          min-h-screen sm:min-h-[844px]
          bg-[#FFFBEA]
          rounded-none sm:rounded-[20px]
          shadow-none sm:shadow-xl
          px-6 pt-10 pb-8
          flex flex-col
        "
            >

                {/* back arrow */}
                <Link to="/login" className="absolute top-6 left-6 text-[#FFAC75]">
                    <ArrowLeft size={32} />
                </Link>

                {/* title */}
                <div className="mt-11">
                    <h1 className="text-5xl font-bold text-[#4969B2]">
                        New Password
                    </h1>
                    <p className="mt-3 text-sm text-[#95A9D7] font-light">
                        Your new password must be different from previous used passwords.
                    </p>
                </div>


                {/* form area */}
                <div className="mt-8">

                    {/* yellow box */}
                    <div className="bg-[#FFEB83] rounded-2xl p-4 sm:p-5">

                        {/* password */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
                                <Lock size={16} />
                                Password
                            </label>

                            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="ml-2"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} className="text-[#4969B2]" />
                                    ) : (
                                        <Eye size={18} className="text-[#4969B2]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className="mb-0 mt-5">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
                                <Lock size={16} />
                                Confirm Password
                            </label>

                            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="ml-2"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} className="text-[#4969B2]" />
                                    ) : (
                                        <Eye size={18} className="text-[#4969B2]" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* reset password button (อยู่นอกกล่อง) */}
                <button
                    className="
                            mt-8 w-full
                            bg-[#4969B2] text-white
                            py-3 sm:py-4
                            rounded-2xl font-semibold
                            hover:bg-[#3E5FA3] transition
                            "
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}