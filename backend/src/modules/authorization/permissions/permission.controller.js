import {
    getUserPermissionConfiguration,
    setUserPermissionOverride,
    removeUserPermissionOverride,
} from "./permission-management.service.js";

import {
    userPermissionParamsSchema,
    setUserPermissionSchema,
} from "../../auth/auth.schemas.js";

function validateRequest(schema, data) {
    const result = schema.safeParse(data);

    if (!result.success) {
        const error = new Error("Invalid request details.");
        error.statusCode = 400;
        error.details = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        throw error;
    }

    return result.data;
}

export async function getUserPermissions(req, res, next) {
    try {
        const params = validateRequest(
            userPermissionParamsSchema,
            req.params
        );

        const result = await getUserPermissionConfiguration(
            req.user.id,
            params.userId,
        );

        return res.status(200).json({
            success: true,
            message: "User permissions retrieved successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

export async function updateUserPermission(req, res, next) {
    try {
        const params = validateRequest(
            userPermissionParamsSchema,
            req.params
        );

        const body = validateRequest(
            setUserPermissionSchema,
            req.body
        );

        if (!params.permissionSlug) {
            const error = new Error("Permission slug is required.");
            error.statusCode = 400;
            throw error;
        }

        const result = await setUserPermissionOverride({
            actorId: req.user.id,
            targetUserId: params.userId,
            permissionSlug: params.permissionSlug,
            isGranted: body.isGranted,
        });

        return res.status(200).json({
            success: true,
            message: "User permission updated successfully.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}

export async function deleteUserPermission(req, res, next) {
    try {
        const params = validateRequest(
            userPermissionParamsSchema,
            req.params
        );

        if (!params.permissionSlug) {
            const error = new Error("Permission slug is required.");
            error.statusCode = 400;
            throw error;
        }

        const result = await removeUserPermissionOverride({
            actorId: req.user.id,
            targetUserId: params.userId,
            permissionSlug: params.permissionSlug,
        });

        return res.status(200).json({
            success: true,
            message: result.removed
                ? "User permission override removed successfully."
                : "No permission override existed for this user.",
            data: result,
        });
    } catch (error) {
        return next(error);
    }
}
