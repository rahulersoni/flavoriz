import {
    registerUser,
    verifyUserEmail,
    loginUser,
    refreshUserSession,
    logoutUser
} from "./auth.service.js";

import { resolveUserPermissions } from "../authorization/permissions/permission.service.js";
import { env } from "../../config/env.js";

export async function login(req, res, next) {
    try {
        const result = await loginUser(req.body);
        const authorization = await resolveUserPermissions(result.user.id);

        const isProduction = env.NODE_ENV === "production";

        res.cookie(
            env.REFRESH_TOKEN_COOKIE_NAME,
            result.refreshToken,
            {
                httpOnly: true,
                secure: isProduction,
                sameSite: "lax",
                path: "/api/v1/auth",
                maxAge:
                    env.REFRESH_TOKEN_EXPIRES_IN_DAYS *
                    24 * 60 * 60 * 1000,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                user: result.user,
                authorization,
                accessToken: result.accessToken,
                sessionExpiresAt: result.sessionExpiresAt,
            },
        });
    } catch (error) {
        return next(error);
    }
}


export async function register(req, res, next) {
    try {
        const result = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email to activate your account.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

export async function verifyEmail(req, res, next) {
    try {
        const user = await verifyUserEmail(req.body);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. Your account is now active.",
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
}

export async function refresh(req, res, next) {
    try {
        const refreshToken = req.cookies?.[
            env.REFRESH_TOKEN_COOKIE_NAME
        ];

        // No refresh cookie means the visitor is not logged in.
        if (!refreshToken) {
            return res.status(200).json({
                success: true,
                authenticated: false,
                message: "No active session found.",
            });
        }

        const result = await refreshUserSession(refreshToken);

        const authorization = await resolveUserPermissions(
            result.user.id
        );

        const isProduction = env.NODE_ENV === "production";

        res.cookie(
            env.REFRESH_TOKEN_COOKIE_NAME,
            result.refreshToken,
            {
                httpOnly: true,
                secure: isProduction,
                sameSite: "lax",
                path: "/api/v1/auth",
                maxAge:
                    env.REFRESH_TOKEN_EXPIRES_IN_DAYS *
                    24 * 60 * 60 * 1000,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Session refreshed successfully.",
            data: {
                user: result.user,
                authorization,
                accessToken: result.accessToken,
                sessionExpiresAt: result.sessionExpiresAt,
            },
        });
    } catch (error) {
        // Remove an invalid or expired refresh cookie.
        if (error.statusCode === 401) {
            res.clearCookie(
                env.REFRESH_TOKEN_COOKIE_NAME,
                {
                    httpOnly: true,
                    secure: env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/api/v1/auth",
                }
            );
        }

        return next(error);
    }
}

export async function logout(req, res, next) {
    try {
        const refreshToken = req.cookies?.[
            env.REFRESH_TOKEN_COOKIE_NAME
        ];

        await logoutUser(refreshToken);

        res.clearCookie(
            env.REFRESH_TOKEN_COOKIE_NAME,
            {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/api/v1/auth",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Logout successful.",
        });
    } catch (error) {
        return next(error);
    }
}

export async function getCurrentUser(req, res, next) {
    try {
        const authorization = await resolveUserPermissions(
            req.user.id
        );

        if (!authorization) {
            return res.status(404).json({
                success: false,
                message: "User authorization information not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                user: req.user,
                authorization,
            },
        });
    } catch (error) {
        return next(error);
    }
}