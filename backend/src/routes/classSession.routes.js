import { Router } from "express";
import { 
    createClassSession,
    getClassSession
} 
from "../controllers/classSession.controller.js";

const router = Router();

router.post("/class-session", createClassSession); // POST: create class in session
router.get("/class-session/:session_id", getClassSession); // GET: fetch class in session

export default router;