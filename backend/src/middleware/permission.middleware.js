
import { resolveUserPermissions } from "../modules/authorization/permissions/permission.service.js";

export function requirePermission(permissionSlug) {
    if (
        typeof permissionSlug !== "string" ||
        !permissionSlug.trim()
    ) {
        throw new Error("A valid permission slug is required.");
    }

    return async function (req, res, next) {
        try {
            if (!req.user?.id) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required.",
                });
            }

            const result = await resolveUserPermissions(req.user.id);

            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required.",
                });
            }

            // Attach the resolved permissions to the request.
            req.user.permissions = result.permissions;
            req.user.isAdmin = result.isAdmin;

            // Protected Admin role bypasses individual permission checks.
            if (result.isAdmin) {
                return next();
            }

            if (!result.permissions.includes(permissionSlug)) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have permission to perform this action.",
                });
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };
}
