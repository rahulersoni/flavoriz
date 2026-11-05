
import { Router } from "express";
import {
    register,
    verifyEmail,
    login,
    refresh,
    logout,
} from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
