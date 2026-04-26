import { useEffect, useRef, useState } from "react";
import { Menu, Settings, LogOut, House, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertModal from "../components/AlertModal";

/* ===== reusable menu item ===== */
function MenuItem({ icon: Icon, label, onClick, variant = "primary", to }) {
  const variants = {
    primary: "bg-[#AFC1F3] text-[#4F6DB8]",
    danger: "bg-[#AFC1F3] text-white",
    join: "bg-[#AFC1F3] text-[#4F6DB8]",
  };

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow transition ${variants[variant]}`}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow transition ${variants[variant]}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function ProfileProf() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { profile, handleSignOut, updateProfile } = useAuth(); // Auth function

  const fileInputRef = useRef(null);

  const headerRef = useRef(null);
  const joinRef = useRef(null);

  const username = profile?.username || "checkma";
  const email = profile?.email || "example@gmail.com";

  //Form Data
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openMenu &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      )
        setOpenMenu(false);

      if (showJoin && joinRef.current && !joinRef.current.contains(e.target))
        setShowJoin(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, showJoin]);

  // HANDLE CHANGE: IMAGE
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  // HANDLE CHANGE: PROFILE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [alertConfig, setAlertConfig] = useState({
    open: false,
    title: "",
    description: "",
    type: "info",
  });

  const closeAlert = () => setAlertConfig((prev) => ({ ...prev, open: false }));

  // HANDLE SAVE: function simplify
  const handleSave = async () => {
    const { error } = await updateProfile(formData, selectedFile);

    if (error) {
      setAlertConfig({
        open: true,
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
      return;
    }

    setAlertConfig({
      open: true,
      title: "Success!",
      description: "Profile updated successfully!",
      type: "success",
    });
  };

  // PROF PROFILE: form data differences (professor)
  useEffect(() => {
    if (!profile) return;

    setFormData((prev) => ({
      ...prev,
      firstname: profile.firstname || "",
      surname: profile.surname || "",
    }));
  }, [profile]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#FFFBEA]">
      <div
        className="relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#4969B2]
                    shadow-none sm:shadow-xl
                    flex flex-col
                    overflow-hidden"
      >
        {/* ================= HEADER ================= */}
        <div ref={headerRef} className="relative shrink-0">
          <header className="h-20 flex items-center justify-between px-5">
            <button onClick={() => setOpenMenu(!openMenu)}>
              <Menu
                size={28}
                className={`text-white transition-transform duration-300 ${openMenu ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>

            <img src="/CHECKMA-logo-white.svg" className="h-7" />

            {/* house */}
            <Link
              to="/prof/home"
              className="flex items-center justify-center text-white"
            >
              <House size={28} />
            </Link>
          </header>

          {openMenu && (
            <div className="absolute top-16 left-4 space-y-2 z-30">
              <MenuItem
                icon={Settings}
                label="Setting"
                to="/prof/profile"
                onClick={() => setOpenMenu(false)}
              />
              <MenuItem
                icon={LogOut}
                label="Log out"
                variant="danger"
                onClick={handleSignOut}
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
                  src={
                    previewImage ||
                    profile?.avatar_url ||
                    "/NongCheckprofile.png"
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full"
                />
              </div>

              {/* edit button */}
              <button
                className="
                absolute -bottom-1 -right-1
                w-10 h-10 rounded-full
                bg-[#FFAC75]
                flex items-center justify-center
                hover:scale-105 transition
                "
              >
                <Pencil
                  size={20}
                  className="text-white"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </button>
            </div>
          </div>

          {/* form area */}
          <div className="flex-1 bg-[#FFFBEA] rounded-t-[40px] overflow-y-auto p-4 flex flex-col">
            {/* account id */}
            <h1 className="text-3xl font-bold text-[#4969B2] mt-20 text-center">
              PROFESSOR
            </h1>
            <p className="text-sm text-[#7C95CF] font-bold text-center">
              @{username}
            </p>

            <div className="flex-1">
              {/* firstname + surname */}
              <div className="my-4 grid grid-cols-2 gap-3 mt-6">
                {/* firstname */}
                <div className="relative">
                  <input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Firstname"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white outline-none
                      placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                  />
                  <Pencil
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]"
                  />
                </div>

                {/* surname */}
                <div className="relative">
                  <input
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Surname"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white outline-none
                      placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                  />
                  <Pencil
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAC75]"
                  />
                </div>
              </div>

              {/* email disabled  */}
              <div className="my-4">
                <div className="flex items-center bg-white rounded-xl font-semibold">
                  <input
                    disabled
                    id="email"
                    type="email"
                    value={email}
                    placeholder="email@gmail.com"
                    className="w-full px-4 py-3 outline-none bg-transparent
                  placeholder:text-[#000000] placeholder:font-bold"
                  />
                </div>
              </div>
            </div>

            {/* save button */}
            <button
              onClick={handleSave}
              className="w-full bg-[#FFEB83] text-base text-[#4969B2] py-3 sm:py-4 mt-auto mb-8
              rounded-2xl font-bold hover:bg-[#FBE475] transition"
            >
              Save
            </button>
          </div>
        </div>

        <AlertModal
          open={alertConfig.open}
          onClose={closeAlert}
          title={alertConfig.title}
          description={alertConfig.description}
          type={alertConfig.type}
          confirmText="OK"
          onConfirm={closeAlert}
        />
      </div>
    </div>
  );
}
