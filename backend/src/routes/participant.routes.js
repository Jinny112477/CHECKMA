import { Router } from "express";
import { 
    getJoinedSession,
    joinClass 
} from "../controllers/participant.controller.js";

const router = Router();

router.post("/join-session", joinClass); // POST: join session
router.get("join-session",  getJoinedSession); // GET: fetch joined session

export default router;