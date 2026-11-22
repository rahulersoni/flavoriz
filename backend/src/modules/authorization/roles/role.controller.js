import {
    getAllRoles,
    getRoleById,
    getAllPermissions,
    createCustomRole,
    updateCustomRole,
    deleteCustomRole,
    addPermissionToRole,
    removePermissionFromRoleService,
    assignRole,
    removeRole,
} from "./role.service.js";

/**
 * GET: Retrieve all roles.
 */
export const getRoles = async (req, res, next) => {
    try {
        const roles = await getAllRoles(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Roles retrieved successfully.",
            data: roles,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET: Retrieve a single role.
 */
export const getRole = async (req, res, next) => {
    try {
        const role = await getRoleById(
            req.user.id,
            req.validatedData.params.roleId
        );

        return res.status(200).json({
            success: true,
            message: "Role retrieved successfully.",
            data: role,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET: Retrieve all available permissions.
 */
export const getPermissions = async (req, res, next) => {
    try {
        const permissions = await getAllPermissions(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Permissions retrieved successfully.",
            data: permissions,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * POST: Create a custom role.
 */
export const createRole = async (req, res, next) => {
    try {
        const role = await createCustomRole(
            req.user.id,
            req.validatedData.body
        );

        return res.status(201).json({
            success: true,
            message: "Role created successfully.",
            data: role,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PATCH: Update a custom role.
 */
export const updateRole = async (req, res, next) => {
    try {
        const role = await updateCustomRole(
            req.user.id,
            req.validatedData.params.roleId,
            req.validatedData.body
        );

        return res.status(200).json({
            success: true,
            message: "Role updated successfully.",
            data: role,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE: Delete a custom role.
 */
export const deleteRole = async (req, res, next) => {
    try {
        await deleteCustomRole(
            req.user.id,
            req.validatedData.params.roleId
        );

        return res.status(200).json({
            success: true,
            message: "Role deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT: Assign a permission to a role.
 */
export const addRolePermission = async (req, res, next) => {
    try {
        const { roleId, permissionSlug } = req.validatedData.params;

        const result = await addPermissionToRole(
            req.user.id,
            roleId,
            permissionSlug
        );

        return res.status(200).json({
            success: true,
            message: "Permission assigned to role successfully.",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE: Remove a permission from a role.
 */
export const removeRolePermission = async (req, res, next) => {
    try {
        const { roleId, permissionSlug } = req.validatedData.params;

        const result = await removePermissionFromRoleService(
            req.user.id,
            roleId,
            permissionSlug
        );

        return res.status(200).json({
            success: true,
            message: "Permission removed from role successfully.",
            data: {
                removed: result.count > 0,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT: Assign a role to a user.
 */
export const assignUserRole = async (req, res, next) => {
    try {
        const { userId, roleId } = req.validatedData.params;

        const result = await assignRole(
            req.user.id,
            userId,
            roleId
        );

        return res.status(200).json({
            success: true,
            message: "Role assigned to user successfully.",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE: Remove a role from a user.
 */
export const removeUserRole = async (req, res, next) => {
    try {
        const { userId, roleId } = req.validatedData.params;

        const result = await removeRole(
            req.user.id,
            userId,
            roleId
        );

        return res.status(200).json({
            success: true,
            message: "Role removed from user successfully.",
            data: {
                removed: result.count > 0,
            },
        });
    } catch (error) {
        next(error);
    }
};
