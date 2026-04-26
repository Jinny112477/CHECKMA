import { useEffect, useRef, useState } from "react";
import { ArrowLeft, House } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import AlertModal from "../components/AlertModal";

export default function DashboardInfo() {
  const [data, setData] = useState([]);
  const [changes, setChanges] = useState({});

  const location = useLocation();
  const selectedClass = location.state;
  const hasStudent = data.length > 0;
  const headerRef = useRef(null);
  const { session_id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  //Time Mapping
  const formatTime = (time) => {
    if (!time) return "-"; // In case student doesn't check
    return time.slice(11, 16);
  };

  // GET: fetch all class attenders
  useEffect(() => {
    if (!selectedClass?.id) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/attend/class-attendance/${session_id}/${selectedClass.id}`,
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, [session_id, selectedClass?.id]);

  // Data change: handler
  const handleChange = (user_id, newStatus) => {
    setChanges((prev) => ({
      ...prev,
      [user_id]: newStatus,
    }));
  };

  // ALERT
  const [alertConfig, setAlertConfig] = useState({
    open: false, title: "", description: "", type: "info",
  });
  const closeAlert = () => setAlertConfig((prev) => ({ ...prev, open: false }));

  // PATCH: Save state: handler
  const handleSave = async () => {
    try {
      await Promise.all(
        Object.entries(changes).map(([user_id, status]) =>
          fetch(`${API_URL}/api/attend/class-attendance/${selectedClass.id}/${user_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          })
        )
      );
      setChanges({});
      setAlertConfig({ open: true, title: "Saved!", description: "Attendance has been saved successfully.", type: "success" });
    } catch (err) {
      console.error(err);
      setAlertConfig({ open: true, title: "Error", description: "Failed to save attendance.", type: "danger" });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#4969B2]">
      <div
        className="relative
                    w-full max-w-[390px]
                    h-screen
                    bg-[#4969B2]
                    shadow-none sm:shadow-xl
                    flex flex-col
                    overflow-y-auto"
      >
        {/* ================= HEADER ================= */}
        <div
          ref={headerRef}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
        >
          <div className="relative bg-[#4969B2]">
            <header className="h-20 flex items-center justify-between px-5">
              {/* back arrow */}
              <Link
                to={`/prof/dashboard/${session_id}`}
                className="top-6 left-6 text-white"
              >
                <ArrowLeft size={32} />
              </Link>

              <img src="/CHECKMA-logo-white.svg" className="h-7" />

              {/* house */}
              <Link
                to="/prof/home"
                className="flex items-center justify-center text-white"
              >
                <House size={28} />
              </Link>
            </header>
          </div>
          <hr className="w-80 h-1 mx-auto mb-2 bg-white border-0 rounded-sm" />
        </div>

        {/* classNum & date */}
        <div className="flex-1 overflow-y-auto pt-[100px] px-6">
          {/* class header (ALWAYS show) */}
          <div className="flex mb-4 items-center">
            <div>
              <div className="text-white text-2xl font-bold mb-1">
                {selectedClass?.class_name || "-"}
              </div>

              <div className="bg-white text-xs font-semibold px-4 py-1 rounded-lg w-fit">
                <div className="text-[#4969B2]">
                  {selectedClass?.class_date
                    ? new Date(selectedClass.class_date).toLocaleDateString(
                        "en-GB",
                      )
                    : "-"}
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="bg-[#6BBF84] text-white text-sm py-1 px-4 rounded-lg font-bold ml-auto">
              Save
            </button>
          </div>

          {/* ===== EMPTY STUDENT STATE ===== */}
          {!hasStudent && (
            <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
              <div className="w-40 h-40 rounded-full bg-[#9DB2E3] flex items-center justify-center">
                <img src="/NongCheck.svg" alt="empty" className="w-32 h-32" />
              </div>

              <p className="text-[#FFFFFF] font-semibold text-lg">
                No students yet!
              </p>
            </div>
          )}

          {/* ===== STUDENT LIST ===== */}
          {hasStudent && (
            <div className="space-y-4">
              {data.map((item) => (
                <InfoCard
                  key={item.user_id}
                  firstname={item.firstname}
                  surname={item.surname}
                  student_id={item.student_id}
                  time={formatTime(item.check_in_time)}
                  status={item.status}
                  onChange={(newStatus) => handleChange(item.user_id, newStatus)}
                />
              ))}
            </div>
          )}
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
