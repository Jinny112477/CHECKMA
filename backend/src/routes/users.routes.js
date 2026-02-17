import { Router } from "express";
import { 
    getUserProfile,
    updateUserProfile
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// PROTECTED ROUTE
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

export default router;
