import {
    findAllRoles,
    findRoleById,
    findRoleBySlug,
    createRole,
    updateRole,
    deleteRole,
    findAllPermissions,
    findPermissionBySlug,
    assignPermissionToRole,
    removePermissionFromRole,
    assignRoleToUser,
    removeRoleFromUser,
    findUserById,
} from "./role.repository.js";

import { resolveUserPermissions } from "../permissions/permission.service.js";

const SENSITIVE_PERMISSIONS = [
    "users.manage",
    "roles.manage",
    "permissions.manage",
    "settings.manage",
];

const createAppError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

/**
 * Check whether the actor can manage roles.
 */
const validateRoleManager = async (actorId) => {
    const permissions = await resolveUserPermissions(actorId);

    if (!permissions.isAdmin && !permissions.permissions.includes("roles.manage")) {
        throw createAppError(403, "You do not have permission to manage roles.");
    }

    return permissions;
};

/**
 * Retrieve all roles.
 */
export const getAllRoles = async (actorId) => {
    await validateRoleManager(actorId);

    return findAllRoles();
};

/**
 * Retrieve a role by ID.
 */
export const getRoleById = async (actorId, roleId) => {
    await validateRoleManager(actorId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    return role;
};

/**
 * Retrieve all available permissions.
 */
export const getAllPermissions = async (actorId) => {
    await validateRoleManager(actorId);

    return findAllPermissions();
};

/**
 * Create a custom role.
 */
export const createCustomRole = async (actorId, input) => {
    await validateRoleManager(actorId);

    const { name, slug, description } = input;

    const existingRole = await findRoleBySlug(slug);

    if (existingRole) {
        throw createAppError(409, "A role with this slug already exists.");
    }

    return createRole({
        name,
        slug,
        description: description || null,
        isSystem: false,
    });
};

/**
 * Update a custom role.
 */
export const updateCustomRole = async (actorId, roleId, input) => {
    await validateRoleManager(actorId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    if (role.isSystem) {
        throw createAppError(403, "System roles cannot be modified.");
    }

    if (input.slug && input.slug !== role.slug) {
        const existingRole = await findRoleBySlug(input.slug);

        if (existingRole) {
            throw createAppError(409, "A role with this slug already exists.");
        }
    }

    return updateRole(roleId, input);
};

/**
 * Delete a custom role.
 */
export const deleteCustomRole = async (actorId, roleId) => {
    await validateRoleManager(actorId);

    const role = await validateRole(roleId);

    await validateCustomRole(role);

    if (role._count.users > 0) {
        throw createAppError(
            409,
            "Remove this role from all users before deleting it."
        );
    }

    try {
        return await deleteRole(roleId);
    } catch (error) {
        // Handle database-level foreign key protection.
        if (error.code === "P2003" || error.code === "P2014") {
            throw createAppError(
                409,
                "This role is assigned to users and cannot be deleted."
            );
        }

        throw error;
    }
};


/**
 * Assign a permission to a role.
 */
export const addPermissionToRole = async (
    actorId,
    roleId,
    permissionSlug
) => {
    const actorPermissions = await validateRoleManager(actorId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    // Protect system roles.
    if (role.isSystem) {
        throw createAppError(
            403,
            "Permissions of system roles cannot be modified."
        );
    }

    const permission = await findPermissionBySlug(permissionSlug);

    if (!permission) {
        throw createAppError(404, "Permission not found.");
    }

    // Only Admins can delegate sensitive permissions.
    if (
        SENSITIVE_PERMISSIONS.includes(permissionSlug) &&
        !actorPermissions.isAdmin
    ) {
        throw createAppError(
            403,
            "Only Admins can delegate sensitive permissions."
        );
    }

    // Users cannot delegate permissions they do not possess.
    if (
        !actorPermissions.isAdmin &&
        !actorPermissions.permissions.includes(permissionSlug)
    ) {
        throw createAppError(
            403,
            "You cannot delegate a permission you do not possess."
        );
    }

    return assignPermissionToRole({
        roleId,
        permissionId: permission.id,
    });
};


/**
 * Remove a permission from a role.
 */
export const removePermissionFromRoleService = async (
    actorId,
    roleId,
    permissionSlug
) => {
    await validateRoleManager(actorId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    if (role.isSystem) {
        throw createAppError(
            403,
            "Permissions of system roles cannot be modified."
        );
    }

    const permission = await findPermissionBySlug(permissionSlug);

    if (!permission) {
        throw createAppError(404, "Permission not found.");
    }

    return removePermissionFromRole({
        roleId,
        permissionId: permission.id,
    });
};

/**
 * Assign a role to a user.
 */
export const assignRole = async (
    actorId,
    userId,
    roleId
) => {
    const actorPermissions = await validateRoleManager(actorId);

    // Validate the target user before assigning a role.
    await validateTargetUser(userId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    if (role.slug === "admin" && role.isSystem) {
        throw createAppError(
            403,
            "The protected Admin role cannot be assigned through this operation."
        );
    }

    // A non-admin cannot delegate a role containing permissions
    // that they do not possess.
    if (!actorPermissions.isAdmin) {
        const rolePermissions = role.permissions.map(
            (item) => item.permission.slug
        );

        const cannotDelegate = rolePermissions.some(
            (slug) =>
                SENSITIVE_PERMISSIONS.includes(slug) ||
                !actorPermissions.permissions.includes(slug)
        );

        if (cannotDelegate) {
            throw createAppError(
                403,
                "You cannot assign a role containing permissions you cannot delegate."
            );
        }
    }

    return assignRoleToUser({
        userId,
        roleId,
        assignedById: actorId,
    });
};

/**
 * Remove a role from a user.
 */
export const removeRole = async (
    actorId,
    userId,
    roleId
) => {
    await validateRoleManager(actorId);

    const role = await findRoleById(roleId);

    if (!role) {
        throw createAppError(404, "Role not found.");
    }

    if (role.slug === "admin" && role.isSystem) {
        throw createAppError(
            403,
            "The protected Admin role cannot be removed through this operation."
        );
    }

    return removeRoleFromUser({
        userId,
        roleId,
    });
};


const validateTargetUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user || user.deletedAt) {
        throw createAppError(404, "User not found.");
    }

    return user;
};