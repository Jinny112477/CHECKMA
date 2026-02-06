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

import { useEffect } from "react";
import { supabase } from "/supabaseClient";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/student/home");
      }

      if (event === "SIGNED_OUT") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset/new-password" element={<NewPassword />} />
      <Route path="/reset/check-email" element={<CheckEmail />} />

      {/* protected routes */}
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
    </Routes>
  );
}

export default App;
