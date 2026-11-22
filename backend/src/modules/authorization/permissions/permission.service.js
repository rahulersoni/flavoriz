import { prisma } from "../../../lib/prisma.js";

export async function resolveUserPermissions(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            roles: {
                select: {
                    role: {
                        select: {
                            slug: true,
                            isSystem: true,
                            permissions: {
                                select: {
                                    permission: {
                                        select: {
                                            slug: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            permissionOverrides: {
                select: {
                    isGranted: true,
                    permission: {
                        select: {
                            slug: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) {
        return null;
    }

    // A protected system Admin role grants full authorization.
    const isAdmin = user.roles.some(
        ({ role }) => role.slug === "admin" && role.isSystem
    );

    // Collect permissions inherited from all assigned roles.
    const effectivePermissions = new Set(
        user.roles.flatMap(({ role }) =>
            role.permissions.map(
                ({ permission }) => permission.slug
            )
        )
    );

    // Apply user-specific overrides.
    // An explicit grant adds a permission.
    // An explicit denial removes an inherited permission.
    for (const override of user.permissionOverrides) {
        const permissionSlug = override.permission.slug;

        if (override.isGranted) {
            effectivePermissions.add(permissionSlug);
        } else {
            effectivePermissions.delete(permissionSlug);
        }
    }

    return {
        isAdmin,
        permissions: [...effectivePermissions],
    };
}
