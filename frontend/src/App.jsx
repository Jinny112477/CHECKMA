import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/Reset-Password";
import NewPassword from "./pages/New-Password";
import CheckEmail from "./pages/Check-email";
import HomeStudent from "./pages/Student-Home";
import HomeProf from "./pages/Prof-Home";
import JoinStudent from "./pages/Student-Join";
import CreateProf from "./pages/Prof-Create";
import ProfileStudent from "./pages/Student-Profile";
import ProfileProf from "./pages/Prof-Profile";
import RoleSelect from "./pages/Role-Select";
import AttendanceStudent from "./pages/Student-Attendance"
import SignalStudent from "./pages/Student-Signal";
import AttendanceProf from "./pages/Prof-attendance";
import SignalProf from "./pages/Prof-Signal";
import Dashboard from "./pages/Dashboard";
import DashboardInfo from "./pages/Dashboard-Info";
import EditProf from "./pages/Prof-EditCourse";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Home /><AuthRedirect /></>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset/new-password" element={<NewPassword />} />
      <Route path="/reset/check-email" element={<CheckEmail />} />
      <Route path="/student/home" element={<HomeStudent />} />
      <Route path="/prof/home" element={<HomeProf />} />
      <Route path="/student/join" element={<JoinStudent />} />
      <Route path="/prof/create" element={<CreateProf />} />
      <Route path="/student/profile" element={<ProfileStudent />} />
      <Route path="/prof/profile" element={<ProfileProf />} />
      <Route path="/role" element={<RoleSelect />} />
      
      <Route path="/student/attendance" element={<AttendanceStudent />} />
      <Route path="/student/signal" element={<SignalStudent />} />

      <Route path="/prof/attendance/:session_id" element={<AttendanceProf />} />
      <Route path="/prof/signal/:session_id" element={<SignalProf />} />
      <Route path="/prof/dashboard/:session_id" element={<Dashboard />} />
      <Route path="/prof/dashboard-info/:session_id" element={<DashboardInfo />} />
      <Route path="/prof/edit-course/:session_id" element={<EditProf />} />
    </Routes>
  );
}

export default App;
