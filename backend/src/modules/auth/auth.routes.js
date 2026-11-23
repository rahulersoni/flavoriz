
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

import {
    ensureCsrfSession,
    requireCsrfSession,
    generateCsrfToken,
    doubleCsrfProtection,
} from "../../middleware/csrf.middleware.js";

const router = Router();

/**
 * GET: Generate a CSRF token for the frontend.
 *
 * Creates a CSRF session if one doesn't already exist.
 */
router.get("/csrf-token", ensureCsrfSession, (req, res) => {
    const csrfToken = generateCsrfToken(req, res);

    return res.status(200).json({
        success: true,
        data: {
            csrfToken,
        },
    });
});

/**
 * CSRF-protected authentication endpoints.
 */
router.post("/register", requireCsrfSession, doubleCsrfProtection, register);
router.post("/verify-email", requireCsrfSession, doubleCsrfProtection, verifyEmail);
router.post("/login", requireCsrfSession, doubleCsrfProtection, login);
router.post("/refresh", requireCsrfSession, doubleCsrfProtection, refresh);
router.post("/logout", requireCsrfSession, doubleCsrfProtection, logout);

/**
 * GET: Retrieve the currently authenticated user.
 */
router.get("/me", authenticate, getCurrentUser);

/**
 * GET: Test permission middleware.
 */
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
