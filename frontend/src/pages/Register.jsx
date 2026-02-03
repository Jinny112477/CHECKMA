import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, AtSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("User registered!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA] font-quicksand px-4">
      {/* phone / app container */}
      <div
        className="relative w-full max-w-[390px] min-h-screen sm:min-h-[844px] bg-[#FFFBEA] rounded-none sm:rounded-[20px]
                shadow-none sm:shadow-xl px-6 pt-10"
      >
        {/* back arrow */}
        <Link to="/" className="absolute top-6 left-6 text-[#FFAC75]">
          <ArrowLeft size={32} />
        </Link>

        {/* title */}
        <div className=" sm:mt-15">
          <h1 className="mt-[20px] text-5xl sm:text-5xl font-bold text-[#4969B2]">
            Register
          </h1>
          <p className="mt-[8px]">
            <span className="text-[#95A9D7] font-light">Hello </span>
            <span className="text-[#697EAE] font-semibold">new friend!</span>
          </p>
        </div>

        {/* form box */}
        <div className="mt-[2px] sm:mt-5 bg-[#FFEB83] rounded-2xl p-4 sm:p-5">
          {/* email */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <Mail size={16} />
              Email
            </label>

            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
            </div>
          </div>

          {/* username */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#4969B2] mb-1">
              <User size={16} />
              Username
            </label>

            <div className="flex items-center bg-white rounded-xl px-3 font-semibold">
              <AtSign className="text-[#4969B2] text-semibold" size={16} />
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-3 outline-none bg-transparent
                                placeholder:text-[#9DB2E3] placeholder:font-normal"
              />
            </div>
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

        {/* login button */}
        <button
            onClick={handleSignup}
            className="mt-6 sm:mt-8 w-full bg-[#4969B2] text-white py-3 sm:py-4
                    rounded-2xl font-semibold hover:bg-[#3E5FA3] transition"
        >
          Sign up
        </button>

        {/* divider */}
        <div className="flex items-center mt-3 mb-2">
          <div className="flex-1 h-px bg-[#4969B2]" />
          <span className="px-3 text-sm text-[#4969B2]">or continue with</span>
          <div className="flex-1 h-px bg-[#4969B2]" />
        </div>

        {/* google button */}
        <button
          className="mt-3 w-full border-2 border-black bg-white py-3 sm:py-4
                    rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <img src="/googleicon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Sign up with google</span>
        </button>

        {/* register */}
        <p className="mt-3 text-center text-sm text-[#718DCC]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline font-semibold text-[#F49A5E] hover:text-[#FC812E] transition"
          >
            Log in!
          </Link>
        </p>
      </div>
    </div>
  );
}
