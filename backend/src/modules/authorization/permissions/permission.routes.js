import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";

import {
    getUserPermissions,
    updateUserPermission,
    deleteUserPermission,
} from "./permission.controller.js";

const router = Router();

// View a user's effective permissions and overrides.
router.get(
    "/users/:userId/permissions",
    authenticate,
    requirePermission("permissions.manage"),
    getUserPermissions
);

// Grant or deny an individual permission.
router.put(
    "/users/:userId/permissions/:permissionSlug",
    authenticate,
    requirePermission("permissions.manage"),
    updateUserPermission
);

// Remove an individual permission override.
router.delete(
    "/users/:userId/permissions/:permissionSlug",
    authenticate,
    requirePermission("permissions.manage"),
    deleteUserPermission
);

export default router;
