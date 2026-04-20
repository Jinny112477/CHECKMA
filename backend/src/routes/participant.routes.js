import { Router } from "express";
import { 
    joinClass,
    getJoinedSession,
    getParticipantById
} from "../controllers/participant.controller.js";

const router = Router();

router.post("/join-session", joinClass); // POST: join session
router.get("/join-session",  getJoinedSession); // GET: fetch joined session
router.get("/join-session/:session_id", getParticipantById); // GET; fetch session participants 

export default router;