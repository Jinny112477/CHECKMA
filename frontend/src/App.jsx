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
import ProfileStudent from "./pages/Student-Profile"
import ProfileProf from "./pages/Prof-Profile"

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset/new-password" element={<NewPassword />} />
      <Route path="/reset/check-email" element={<CheckEmail />} />

      <Route
        path="/student/home"
        element={
          <ProtectedRoute>
            <HomeStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prof/home"
        element={
          <ProtectedRoute>
            <HomeProf />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/join"
        element={
          <ProtectedRoute>
            <JoinStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prof/create"
        element={
          <ProtectedRoute>
            <CreateProf />
          </ProtectedRoute>
        }
      />

        <Route path="/student/profile" element={<ProfileStudent />}/>
        <Route path="/prof/profile" element={<ProfileProf />}/>
      </Routes>
  );
}

export default App;
