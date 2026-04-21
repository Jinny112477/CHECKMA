import { Router } from "express";
import {  
    sendSignal,
    getSignals
} from "../controllers/signal.controller.js"

const router = Router();

router.post("/signal/:class_id", sendSignal); // POST: send signal
router.get("/signal/:class_id", getSignals); // GET: fetch card from signal

export default router;