import { Router } from "express";
import { 
    joinClass 
} from "../controllers/participant.controller.js";

const router = Router();

router.post("/join-session", joinClass); // POST: join class

export default router;