import { Router } from "express";
import { sendSignal } from "../controllers/signal.controller.js"

const router = Router();

router.post("/signals", sendSignal); // POST: send signal

export default router;