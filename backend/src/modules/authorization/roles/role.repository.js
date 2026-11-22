import { prisma } from "../../../lib/prisma.js";

/**
 * Retrieve all roles with their permissions and usage counts.
 */
export const findAllRoles = async () => {
    return prisma.role.findMany({
        orderBy: {
            id: "asc",
        },
        include: {
            permissions: {
                include: {
                    permission: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            description: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    users: true,
                    permissions: true,
                },
            },
        },
    });
};

/**
 * Find a role by its ID.
 */
export const findRoleById = async (id) => {
    return prisma.role.findUnique({
        where: { id },
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
            _count: {
                select: {
                    users: true,
                    permissions: true,
                },
            },
        },
    });
};

/**
 * Find a role by its unique slug.
 */
export const findRoleBySlug = async (slug) => {
    return prisma.role.findUnique({
        where: { slug },
    });
};

/**
 * Find a user by their ID.
 */
export const findUserById = async (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            deletedAt: true,
        },
    });
};

/**
 * Create a custom role.
 */
export const createRole = async (data) => {
    return prisma.role.create({
        data,
    });
};

/**
 * Update role details.
 */
export const updateRole = async (id, data) => {
    return prisma.role.update({
        where: { id },
        data,
    });
};

/**
 * Delete a role.
 */
export const deleteRole = async (id) => {
    return prisma.role.delete({
        where: { id },
    });
};

/**
 * Retrieve all available permissions.
 */
export const findAllPermissions = async () => {
    return prisma.permission.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

/**
 * Find a permission by its unique slug.
 */
export const findPermissionBySlug = async (slug) => {
    return prisma.permission.findUnique({
        where: { slug },
    });
};

/**
 * Assign a permission to a role.
 */
export const assignPermissionToRole = async ({
    roleId,
    permissionId,
}) => {
    return prisma.rolePermission.upsert({
        where: {
            roleId_permissionId: {
                roleId,
                permissionId,
            },
        },
        update: {},
        create: {
            roleId,
            permissionId,
        },
    });
};

/**
 * Remove a permission from a role.
 */
export const removePermissionFromRole = async ({
    roleId,
    permissionId,
}) => {
    return prisma.rolePermission.deleteMany({
        where: {
            roleId,
            permissionId,
        },
    });
};

/**
 * Assign a role to a user.
 */
export const assignRoleToUser = async ({
    userId,
    roleId,
    assignedById,
}) => {
    return prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId,
                roleId,
            },
        },
        update: {},
        create: {
            userId,
            roleId,
            assignedById,
        },
    });
};

/**
 * Remove a role from a user.
 */
export const removeRoleFromUser = async ({
    userId,
    roleId,
}) => {
    return prisma.userRole.deleteMany({
        where: {
            userId,
            roleId,
        },
    });
};

