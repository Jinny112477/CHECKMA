import { Router } from "express";
import { checkInAttendance } from "../controllers/attendance.controller.js"

const router = Router();

router.post("/check-in", checkInAttendance); // POST: checking Attendance

export default router;