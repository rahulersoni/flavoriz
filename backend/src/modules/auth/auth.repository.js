
import { prisma } from "../../lib/prisma.js";

export async function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            status: true,
            emailVerifiedAt: true,
            deletedAt: true,
        },
    });
}


export async function createUserWithSubscriberRole({
    name,
    email,
    passwordHash,
    verificationTokenHash,
    verificationTokenExpiresAt,
}) {
    return prisma.$transaction(async (tx) => {
        const subscriberRole = await tx.role.findUnique({
            where: { slug: "subscriber" },
            select: { id: true },
        });

        if (!subscriberRole) {
            throw new Error("Required Subscriber role is not configured.");
        }

        const user = await tx.user.create({
            data: {
                name,
                email,
                passwordHash,
                status: "PENDING_VERIFICATION",
                roles: {
                    create: {
                        roleId: subscriberRole.id,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                createdAt: true,
            },
        });

        await tx.authToken.create({
            data: {
                userId: user.id,
                tokenHash: verificationTokenHash,
                type: "EMAIL_VERIFICATION",
                expiresAt: verificationTokenExpiresAt,
            },
        });

        return user;
    });
}


export async function createAuthToken({
    userId,
    tokenHash,
    type,
    expiresAt,
}) {
    return prisma.authToken.create({
        data: {
            userId,
            tokenHash,
            type,
            expiresAt,
        },
        select: {
            id: true,
            userId: true,
            type: true,
            expiresAt: true,
        },
    });
}


export async function verifyEmailToken(tokenHash) {
    const now = new Date();

    return prisma.$transaction(async (tx) => {
        const tokenRecord = await tx.authToken.findUnique({
            where: { tokenHash },
            select: {
                id: true,
                userId: true,
                type: true,
                expiresAt: true,
                usedAt: true,
            },
        });

        // Reject missing, incorrect, expired, or previously used tokens.
        if (
            !tokenRecord ||
            tokenRecord.type !== "EMAIL_VERIFICATION" ||
            tokenRecord.usedAt ||
            tokenRecord.expiresAt <= now
        ) {
            return null;
        }

        // Atomically consume the token to prevent reuse.
        const consumed = await tx.authToken.updateMany({
            where: {
                id: tokenRecord.id,
                type: "EMAIL_VERIFICATION",
                usedAt: null,
                expiresAt: { gt: now },
            },
            data: {
                usedAt: now,
            },
        });

        if (consumed.count !== 1) {
            return null;
        }

        // Activate the account only after consuming the token.
        return tx.user.update({
            where: { id: tokenRecord.userId },
            data: {
                status: "ACTIVE",
                emailVerifiedAt: now,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                emailVerifiedAt: true,
            },
        });
    });
}

export async function findUserForLogin(email) {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            status: true,
            emailVerifiedAt: true,
            deletedAt: true,
        },
    });
}


export async function createSession({
    userId,
    refreshTokenHash,
    expiresAt,
}) {
    return prisma.session.create({
        data: {
            userId,
            refreshTokenHash,
            expiresAt,
        },
        select: {
            id: true,
            userId: true,
            expiresAt: true,
            createdAt: true,
        },
    });
}



export async function rotateSession({
    refreshTokenHash,
    newRefreshTokenHash,
    newExpiresAt,
}) {
    const now = new Date();

    return prisma.$transaction(async (tx) => {
        // Find the existing session and its user.
        const oldSession = await tx.session.findUnique({
            where: { refreshTokenHash },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        status: true,
                        emailVerifiedAt: true,
                        deletedAt: true,
                    },
                },
            },
        });

        if (
            !oldSession ||
            oldSession.revokedAt ||
            oldSession.expiresAt <= now
        ) {
            return null;
        }

        const user = oldSession.user;

        // Only active, verified accounts can refresh sessions.
        if (
            user.status !== "ACTIVE" ||
            !user.emailVerifiedAt ||
            user.deletedAt
        ) {
            return null;
        }

        // Atomically revoke the old session.
        const revoked = await tx.session.updateMany({
            where: {
                id: oldSession.id,
                revokedAt: null,
                expiresAt: { gt: now },
            },
            data: {
                revokedAt: now,
                lastUsedAt: now,
            },
        });

        if (revoked.count !== 1) {
            return null;
        }

        // Create a new session for the rotated refresh token.
        const newSession = await tx.session.create({
            data: {
                userId: user.id,
                refreshTokenHash: newRefreshTokenHash,
                expiresAt: newExpiresAt,
            },
            select: {
                id: true,
                expiresAt: true,
            },
        });

        return {
            user,
            sessionExpiresAt: newSession.expiresAt,
        };
    });
}


export async function revokeSession(refreshTokenHash) {
    const now = new Date();

    return prisma.session.updateMany({
        where: {
            refreshTokenHash,
            revokedAt: null,
        },
        data: {
            revokedAt: now,
            lastUsedAt: now,
        },
    });
}