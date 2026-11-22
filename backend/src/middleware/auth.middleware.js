
import { jwtVerify } from "jose";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

const accessTokenSecret = new TextEncoder().encode(
    env.ACCESS_TOKEN_SECRET
);

export async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const accessToken = authorization.slice(7).trim();

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const { payload } = await jwtVerify(
            accessToken,
            accessTokenSecret,
            {
                issuer: "flavoriz-api",
                audience: "flavoriz-web",
                algorithms: ["HS256"],
            }
        );

        if (!payload.sub || !/^\d+$/.test(payload.sub)) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token.",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(payload.sub),
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                emailVerifiedAt: true,
                deletedAt: true,
            },
        });

        if (
            !user ||
            user.status !== "ACTIVE" ||
            !user.emailVerifiedAt ||
            user.deletedAt
        ) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        req.user = user;

        return next();
    } catch (error) {
        if (
            error.code === "ERR_JWT_EXPIRED" ||
            error.code === "ERR_JWS_INVALID" ||
            error.code === "ERR_JWT_CLAIM_VALIDATION_FAILED" ||
            error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired access token.",
            });
        }

        return next(error);
    }
}
