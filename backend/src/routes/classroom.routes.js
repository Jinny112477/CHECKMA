import { Router } from "express";
import { classroomCreate, getMyClasses } from "../controllers/classroom.controller.js";

const router = Router();

router.post("/classrooms", classroomCreate); // POST classroom create
router.get("/classrooms", getMyClasses); // GET fetch classroom

export default router;