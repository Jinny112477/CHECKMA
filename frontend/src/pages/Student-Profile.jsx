import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Settings,
  LogOut,
  House,
  Pencil
} from "lucide-react";
import { Link } from "react-router-dom";

/* ===== reusable menu item ===== */
function MenuItem({ icon: Icon, label, onClick, variant = "primary", to }) {
  const variants = {
    primary: "bg-[#AFC1F3] text-[#4F6DB8]",
    danger: "bg-[#AFC1F3] text-white",
    join: "bg-[#AFC1F3] text-[#4F6DB8]",
  };

  if(to) {
    return (
      <Link to={to} onClick={onClick} className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition ${variants[variant]}`}>
        <Icon size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition ${variants[variant]}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function ProfileStudent() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const headerRef = useRef(null);
  const joinRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (openMenu && headerRef.current && !headerRef.current.contains(e.target))
        setOpenMenu(false);

      if (showJoin && joinRef.current && !joinRef.current.contains(e.target))
        setShowJoin(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, showJoin]);

  return(
    <div className="min-h-screen w-full flex justify-center bg-white">
      <div className="relative w-full max-w-[390px] h-screen bg-[#4F6DB8] flex flex-col overflow-hidden">


        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-[90px] flex items-center justify-between px-5">
            <button onClick={() => setOpenMenu(!openMenu)}>
              <Menu
                size={28}
                className={`text-white transition-transform duration-300 ${
                openMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* house */}
            <Link to="/student/home" className="flex items-center justify-center text-white">
              <House size={28} />
            </Link>
          </header>

          {openMenu && (
            <div className="absolute top-[70px] left-4 space-y-2 z-30">
              <MenuItem
                  icon={Settings}
                  label="Setting"
                  to="/student/profile"
                  onClick={() => setOpenMenu(false)}
              />
              <MenuItem
                  icon={LogOut}
                  label="Log out"
                  variant="danger"
                  onClick={() => setOpenMenu(false)}
              />
            </div>
          )}
        </div>


        {/* ================= CONTENT ================= */}
        <div className="relative flex-1 flex flex-col mt-16">

          {/* profile image floating */}
          <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              {/* profile circle */}
              <div className="w-32 h-32 rounded-full bg-white border-8 border-[#FFFBEA] overflow-hidden">
                {/* แสดงรูปโปรไฟล์ */}
                <img 
                  src="/NongCheckicon.png" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* edit button */}
              <button
                className="
                absolute -bottom-1 -right-1
                w-10 h-10 rounded-full
                bg-[#F7A76C]
                flex items-center justify-center
                hover:scale-105 transition
                "
              >
                <Pencil size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* form area */}
          <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-4">

            {/* account id */}
            <h1 className="text-3xl font-bold text-[#4969B2] mt-20 text-center">
              STUDENT
            </h1>
            <p className="text-sm text-[#7C95CF] font-bold text-center">
              @checkma
            </p>

            {/* firstname + surname */}
            <div className="m-2 grid grid-cols-2 gap-3 mt-6">
              {/* firstname */}
              <div className="relative">
                  <input
                  type="text"
                  placeholder="Firstname"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white outline-none
                    placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                  />
                <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]" />
              </div>

              {/* surname */}
              <div className="relative">
                  <input
                  type="text"
                  placeholder="Surname"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white outline-none
                    placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                  />
                <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]" />
              </div>
            </div> 

            {/* email disabled  */}
            <div className="m-2">
              <div className="flex items-center bg-white rounded-xl font-semibold">
                <input
                disabled
                id="email" 
                type="email"
                placeholder="email@gmail.com"
                className="w-full px-4 py-3 outline-none bg-transparent
                placeholder:text-[#000000] placeholder:font-bold"
                />
              </div>
            </div>

            {/* student number  */}
            <div className="m-2">
              <div className="flex items-center bg-white rounded-xl font-semibold relative">
                <input
                type="text"
                placeholder="Student Number"
                className="w-full px-4 py-3 pr-10 outline-none bg-transparent
                placeholder:text-[#9DB2E3] placeholder:font-light"
                />
                <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]" />
              </div>
            </div>

            {/* faculty  */}
            <div className="m-2">
              <div className="flex items-center bg-white rounded-xl font-semibold relative">
                <input 
                type="text"
                placeholder="Faculty"
                className="w-full px-4 py-3 pr-10 outline-none bg-transparent
                placeholder:text-[#9DB2E3] placeholder:font-light"
                />
                <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]" />
              </div>
            </div>

            {/* major  */}
            <div className="m-2">
              <div className="flex items-center bg-white rounded-xl font-semibold relative">
                <input 
                type="text"
                placeholder="Major"
                className="w-full px-4 py-3 pr-10 outline-none bg-transparent
                placeholder:text-[#9DB2E3] placeholder:font-light"
                />
                <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]" />
              </div>
            </div>


            {/* create button */}
            <button
              className="mt-8 w-full bg-[#FFEC89] text-[#4969B2] py-3 sm:py-4
              rounded-2xl font-semibold hover:bg-[#ffe97a] transition"
            >
              Save
            </button>

          </div>
          
        </div>
      
      </div>
    </div>
  );
}