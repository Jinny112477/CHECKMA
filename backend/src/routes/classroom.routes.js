import { Router } from "express";
import { 
    classroomCreate, 
    deleteClassroom, 
    editClassroom, 
    getClassById, 
    getMyClasses 
} from "../controllers/classroom.controller.js";

const router = Router();

router.post("/classrooms", classroomCreate); // POST classroom create
router.get("/classrooms", getMyClasses); // GET fetch classroom
router.get("/classrooms/:session_id", getClassById); // GET fetch classroom by ID
router.put("/classrooms/:session_id", editClassroom); // PUT edit classroom
router.delete("/classrooms/:session_id", deleteClassroom); // DELETE: delete classroom

export default router;