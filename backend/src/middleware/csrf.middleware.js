
import { randomBytes } from "node:crypto";
import { doubleCsrf } from "csrf-csrf";
import { env } from "../config/env.js";

const CSRF_SESSION_COOKIE_NAME = "flavoriz_csrf_session";

const isProduction = env.NODE_ENV === "production";

const csrfSessionCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/api/v1",
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

// Create a CSRF session only when one does not already exist.
export function ensureCsrfSession(req, res, next) {
    let sessionId = req.cookies?.[CSRF_SESSION_COOKIE_NAME];

    if (!sessionId) {
        sessionId = randomBytes(32).toString("hex");

        res.cookie(
            CSRF_SESSION_COOKIE_NAME,
            sessionId,
            csrfSessionCookieOptions
        );

        req.cookies = req.cookies || {};
        req.cookies[CSRF_SESSION_COOKIE_NAME] = sessionId;
    }

    next();
}

// Protected requests must have an established CSRF session.
export function requireCsrfSession(req, res, next) {
    const sessionId = req.cookies?.[CSRF_SESSION_COOKIE_NAME];

    if (!sessionId) {
        return res.status(403).json({
            success: false,
            message: "CSRF session missing. Please obtain a CSRF token first.",
        });
    }

    next();
}

const {
    generateCsrfToken,
    doubleCsrfProtection,
    invalidCsrfTokenError,
} = doubleCsrf({
    getSecret: () => env.CSRF_SECRET,

    getSessionIdentifier: (req) =>
        req.cookies?.[CSRF_SESSION_COOKIE_NAME] ?? "",

    cookieName: "flavoriz_csrf_token",

    cookieOptions: {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/api/v1",
    },

    ignoredMethods: ["GET", "HEAD", "OPTIONS"],

    getCsrfTokenFromRequest: (req) =>
        req.headers["x-csrf-token"],
});

export {
    generateCsrfToken,
    doubleCsrfProtection,
    invalidCsrfTokenError,
};
