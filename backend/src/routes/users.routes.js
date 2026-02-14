import { Router } from "express";
import { 
    getUserProfile
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// PROTECTED ROUTE
router.get("/profile", verifyToken, getUserProfile);

export default router;
