import { Router } from "express";
import {  
    sendSignal,
    getSignals,
    cancelSignal
} from "../controllers/signal.controller.js"

const router = Router();

router.post("/signal/:class_id", sendSignal); // POST: send signal
router.get("/signal/:class_id", getSignals); // GET: fetch card from signal
router.post("/signal/:class_id/cancel", cancelSignal); // POST: delete signal when student leaves the page

export default router;