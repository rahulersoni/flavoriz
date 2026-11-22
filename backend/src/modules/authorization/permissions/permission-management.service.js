import {
    findUserForPermissionManagement,
    findUserPermissionOverrides,
    findPermissionBySlug,
    upsertUserPermissionOverride,
    deleteUserPermissionOverride,
} from "../../auth/auth.repository.js";

import { resolveUserPermissions } from "./permission.service.js";

const SENSITIVE_PERMISSIONS = [
    "users.manage",
    "roles.manage",
    "permissions.manage",
    "settings.manage",
];

function createAppError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

// Verify that the actor is allowed to manage permissions.


async function validatePermissionManager(
    actorId,
    targetUserId,
    {
        allowSelf = false,
        allowProtectedAdmin = false,
    } = {}
) {
    if (actorId === targetUserId && !allowSelf) {
        throw createAppError(
            403,
            "You cannot modify your own permissions."
        );
    }

    const actorPermissions = await resolveUserPermissions(actorId);

    if (
        !actorPermissions ||
        (!actorPermissions.isAdmin &&
            !actorPermissions.permissions.includes("permissions.manage"))
    ) {
        throw createAppError(
            403,
            "You do not have permission to manage user permissions."
        );
    }

    const targetUser = await findUserForPermissionManagement(
        targetUserId
    );

    if (!targetUser) {
        throw createAppError(404, "User not found.");
    }

    const targetIsAdmin = targetUser.roles.some(
        ({ role }) => role.slug === "admin" && role.isSystem
    );

    if (targetIsAdmin && !allowProtectedAdmin) {
        throw createAppError(
            403,
            "Permissions of protected administrators cannot be overridden."
        );
    }

    return {
        targetUser,
        actorPermissions,
    };
}



// View a user's effective permissions and individual overrides.
export async function getUserPermissionConfiguration(
    actorId,
    targetUserId
) {
    await validatePermissionManager(actorId, targetUserId, { allowSelf: true, allowProtectedAdmin: true });

    const [resolvedPermissions, overrides] = await Promise.all([
        resolveUserPermissions(targetUserId),
        findUserPermissionOverrides(targetUserId),
    ]);

    return {
        userId: targetUserId,
        effectivePermissions: resolvedPermissions.permissions,
        overrides: overrides.map((override) => ({
            permission: override.permission,
            isGranted: override.isGranted,
            assignedBy: override.assignedBy,
            createdAt: override.createdAt,
            updatedAt: override.updatedAt,
        })),
    };
}

// Grant or deny an individual permission.
export async function setUserPermissionOverride({
    actorId,
    targetUserId,
    permissionSlug,
    isGranted,
}) {
    if (typeof isGranted !== "boolean") {
        throw createAppError(
            400,
            "isGranted must be a boolean value."
        );
    }

    if (
        typeof permissionSlug !== "string" ||
        !permissionSlug.trim()
    ) {
        throw createAppError(400, "A valid permission slug is required.");
    }

    const { actorPermissions } = await validatePermissionManager(
        actorId,
        targetUserId
    );

    const permission = await findPermissionBySlug(permissionSlug);

    if (!permission) {
        throw createAppError(404, "Permission not found.");
    }

    if (
        isGranted &&
        !actorPermissions.isAdmin &&
        SENSITIVE_PERMISSIONS.includes(permissionSlug)
    ) {
        throw createAppError(
            403,
            "Only Admins can grant sensitive permissions."
        );
    }

    return upsertUserPermissionOverride({
        userId: targetUserId,
        permissionId: permission.id,
        isGranted,
        assignedById: actorId,
    });
}

// Remove an override and restore role-based permissions.
export async function removeUserPermissionOverride({
    actorId,
    targetUserId,
    permissionSlug,
}) {
    if (
        typeof permissionSlug !== "string" ||
        !permissionSlug.trim()
    ) {
        throw createAppError(400, "A valid permission slug is required.");
    }

    await validatePermissionManager(actorId, targetUserId);

    const permission = await findPermissionBySlug(permissionSlug);

    if (!permission) {
        throw createAppError(404, "Permission not found.");
    }

    const result = await deleteUserPermissionOverride({
        userId: targetUserId,
        permissionId: permission.id,
    });

    return {
        removed: result.count > 0,
    };
}
