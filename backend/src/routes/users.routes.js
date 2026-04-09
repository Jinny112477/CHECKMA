import { Router } from "express";
import { 
    getUserProfile,
    updateUserProfile
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/profile", verifyToken, getUserProfile); // GET user profile
router.put("/profile", verifyToken, updateUserProfile); // UPDATE user profile

export default router;
