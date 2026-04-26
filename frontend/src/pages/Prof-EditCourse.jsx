import { useState, useEffect } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconProfile from "../components/IconProfile";
import AlertModal from "../components/AlertModal";

export default function EditProf() {
  const [selectedIcon, setSelectedIcon] = useState("CodeXml");
  const [showPicker, setShowPicker] = useState(false);

  const { session_id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course_name: "",
    course_id: "",
    section: "",
    room: "",
    day: "",
    start_time: "",
    end_time: "",
  });

  // GET: fetch pre-fill current classrooms data
  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/sessions/classrooms/${session_id}`,
        );
        const data = await res.json();

        setFormData({
          course_name: data.course_name || "",
          course_id: data.course_id || "",
          section: data.section || "",
          room: data.room || "",
          day: data.day || "",
          start_time: data.start_time || "",
          end_time: data.end_time || "",
        });

        setSelectedIcon(data.icon || "CodeXml");
      } catch (err) {
        console.error(err);
      }
    };

    if (session_id) fetchClassroom();
  }, [session_id]);

  // Data Change: handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ALERT
  const [alertConfig, setAlertConfig] = useState({
    open: false, title: "", description: "", type: "info",
  });
  const closeAlert = () => setAlertConfig((prev) => ({ ...prev, open: false }));

  // PUT: edit classroom
  const handleEditClassroom = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sessions/classrooms/${session_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, icon: selectedIcon }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setAlertConfig({ open: true, title: "Saved!", description: "Course updated successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      setAlertConfig({ open: true, title: "Error", description: "Failed to save course.", type: "danger" });
    }
  };

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
        <Link
          to={"/prof/home"}
          className="absolute top-6 left-6 text-[#9DB2E3]"
        >
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
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                Class name
              </label>
              <div className="flex items-center bg-white rounded-xl font-semibold">
                <input
                  type="text"
                  name="course_name"
                  value={formData.course_name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 outline-none bg-transparent placeholder:text-[#9DB2E3] placeholder:font-normal"
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">
                  Course code
                </label>
                <input
                  type="text"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  placeholder="Code"
                  className="w-full px-4 py-3 rounded-xl bg-white outline-none placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="Section"
                  className="w-full px-4 py-3 rounded-xl bg-white outline-none placeholder:text-[#9DB2E3] placeholder:font-normal font-semibold"
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1 block">
                  Start time
                </label>
                <div className="w-full bg-white rounded-xl overflow-hidden">
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    className={`w-full min-w-0 block box-border appearance-none px-4 py-3 bg-transparent outline-none text-left ${formData.start_time ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-white mb-1 block">
                  End time
                </label>
                <div className="w-full bg-white rounded-xl overflow-hidden">
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    className={`w-full min-w-0 block box-border appearance-none px-4 py-3 bg-transparent outline-none text-left ${formData.end_time ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`}
                  />
                </div>
              </div>
            </div>
            <div className="my-4">
              <label className="text-sm font-semibold text-white mb-1 block">
                Day
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className={`w-full px-3 py-3 rounded-xl bg-white outline-none ${formData.day ? "text-black font-semibold" : "text-[#9DB2E3] font-normal"}`}
              >
                <option value="" disabled>
                  Day
                </option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                Room
              </label>
              <div className="flex items-center bg-white rounded-xl font-semibold">
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Room"
                  className="w-full px-4 py-3 outline-none bg-transparent placeholder:text-[#9DB2E3] placeholder:font-normal"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleEditClassroom}
          className="mt-8 w-full bg-[#4969B2] text-white text-base py-3 sm:py-4 rounded-2xl font-bold hover:bg-[#3E5FA3] transition"
        >
          Save
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
            if (alertConfig.type === "success") navigate("/prof/home");
          }}
        />
      </div>
    </div>
  );
}
