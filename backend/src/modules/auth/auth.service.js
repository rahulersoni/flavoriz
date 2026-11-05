
import argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";

import { env } from "../../config/env.js";
import {
    registerSchema,
    verifyEmailSchema,
    loginSchema,
} from "./auth.schemas.js";

import {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
} from "./auth.tokens.js";

import {
    createUserWithSubscriberRole,
    findUserByEmail,
    findUserForLogin,
    verifyEmailToken,
    createSession,
    rotateSession,
    revokeSession
} from "./auth.repository.js";

function createAppError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

export async function registerUser(input) {
    const validation = registerSchema.safeParse(input);

    if (!validation.success) {
        const error = createAppError(400, "Invalid registration details.");
        error.details = validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw error;
    }

    const { name, email, password } = validation.data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw createAppError(409, "Unable to register with these details.");
    }

    const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
    });

    // Generate a cryptographically secure, single-use token.
    const verificationToken = randomBytes(32).toString("base64url");
    const verificationTokenHash = hashToken(verificationToken);

    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let user;

    try {
        user = await createUserWithSubscriberRole({
            name,
            email,
            passwordHash,
            verificationTokenHash,
            verificationTokenExpiresAt,
        });
    } catch (error) {
        // Handle concurrent registration attempts against the unique email index.
        if (error?.code === "P2002") {
            throw createAppError(
                409,
                "Unable to register with these details."
            );
        }

        throw error;
    }

    // Email delivery will be connected in a later step.
    // Never return the raw verification token from the production API.
    if (env.NODE_ENV !== "production") {
        return {
            user,
            verification: {
                status: "pending_email_integration",
                developmentToken: verificationToken,
            },
        };
    }

    return {
        user,
        verification: {
            status: "pending",
        },
    };
}


export async function verifyUserEmail(input) {
    const validation = verifyEmailSchema.safeParse(input);

    if (!validation.success) {
        const error = createAppError(400, "Invalid verification request.");

        error.details = validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw error;
    }

    const tokenHash = hashToken(validation.data.token);

    const user = await verifyEmailToken(tokenHash);

    if (!user) {
        throw createAppError(
            400,
            "Invalid or expired verification token."
        );
    }

    return user;
}


export async function validateLoginCredentials(input) {
    const validation = loginSchema.safeParse(input);

    if (!validation.success) {
        const error = createAppError(400, "Invalid login details.");

        error.details = validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw error;
    }

    const { email, password } = validation.data;

    const user = await findUserForLogin(email);

    // Use the same response for unknown email and incorrect password.
    if (!user || !user.passwordHash) {
        throw createAppError(401, "Invalid email or password.");
    }

    const passwordIsValid = await argon2.verify(
        user.passwordHash,
        password
    );

    if (!passwordIsValid) {
        throw createAppError(401, "Invalid email or password.");
    }

    if (user.deletedAt) {
        throw createAppError(403, "This account is unavailable.");
    }

    if (user.status === "PENDING_VERIFICATION") {
        throw createAppError(403, "Please verify your email before logging in.");
    }

    if (user.status !== "ACTIVE") {
        throw createAppError(403, "This account is not active.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        emailVerifiedAt: user.emailVerifiedAt,
    };
}



export async function loginUser(input) {
    const user = await validateLoginCredentials(input);

    const accessToken = await generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    const refreshTokenHash = hashToken(refreshToken);

    const expiresAt = new Date(
        Date.now() +
        env.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000
    );

    const session = await createSession({
        userId: user.id,
        refreshTokenHash,
        expiresAt,
    });

    return {
        user,
        accessToken,
        refreshToken,
        sessionExpiresAt: session.expiresAt,
    };
}


export async function refreshUserSession(refreshToken) {
    if (!refreshToken || typeof refreshToken !== "string") {
        throw createAppError(401, "Authentication required.");
    }

    // Hash the incoming refresh token.
    const oldRefreshTokenHash = hashToken(refreshToken);

    // Generate replacement tokens.
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashToken(newRefreshToken);

    const newExpiresAt = new Date(
        Date.now() +
        env.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000
    );

    // Atomically rotate the database session.
    const session = await rotateSession({
        refreshTokenHash: oldRefreshTokenHash,
        newRefreshTokenHash,
        newExpiresAt,
    });

    if (!session) {
        throw createAppError(401, "Invalid or expired session.");
    }

    // Generate a new access token.
    const accessToken = await generateAccessToken(session.user);

    return {
        user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            status: session.user.status,
            emailVerifiedAt: session.user.emailVerifiedAt,
        },
        accessToken,
        refreshToken: newRefreshToken,
        sessionExpiresAt: session.sessionExpiresAt,
    };
}


export async function logoutUser(refreshToken) {
    if (!refreshToken || typeof refreshToken !== "string") {
        return;
    }

    const refreshTokenHash = hashToken(refreshToken);

    await revokeSession(refreshTokenHash);
}