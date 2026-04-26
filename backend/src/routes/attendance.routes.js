import { Router } from "express";
import { checkInAttendance, 
        editStudentStatus, 
        getClassAttendance, 
        getJoinedClassSession,
        getAttendanceStatus
} from "../controllers/attendance.controller.js"

const router = Router();

router.post("/check-in", checkInAttendance); // POST: checking Attendance
router.get("/check-in/:session_id/:user_id", getJoinedClassSession); // GET: fetch joined class session
router.get("/class-attendance/:session_id/:class_id", getClassAttendance); // GET: fetch class attendances
router.patch("/class-attendance/:class_id/:user_id", editStudentStatus); // PATCH: edit user status
router.get("/check-in/status/:class_id/:user_id", getAttendanceStatus); // GET: check if already check in that class

export default router;