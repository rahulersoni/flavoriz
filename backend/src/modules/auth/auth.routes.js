import { Router } from "express";
import {
    register,
    verifyEmail,
    login,
    refresh,
    logout,
    getCurrentUser,
} from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/permission.middleware.js";

const router = Router();

router.get("/me", authenticate, getCurrentUser);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get(
    "/permission-test",
    authenticate,
    requirePermission("comments.create"),
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "Permission granted successfully.",
        });
    }
);
export default router;
