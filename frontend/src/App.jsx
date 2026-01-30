import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/Reset-Password";
import NewPassword from "./pages/New-Password";
import CheckEmail from "./pages/Check-email";
import HomeStudent from "./pages/Student-Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset/new-password" element={<NewPassword />} />
        <Route path="/reset/check-email" element={<CheckEmail />} />
        <Route path="/student/home" element={<HomeStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;