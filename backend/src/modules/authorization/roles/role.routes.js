
import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { requirePermission } from "../../../middleware/permission.middleware.js";
import { validate } from "../../../middleware/validate.middleware.js";

import {
    createRoleSchema,
    updateRoleSchema,
    roleIdParamsSchema,
    userRoleParamsSchema,
    rolePermissionParamsSchema,
} from "./role.schemas.js";

import {
    getRoles,
    getRole,
    getPermissions,
    createRole,
    updateRole,
    deleteRole,
    addRolePermission,
    removeRolePermission,
    assignUserRole,
    removeUserRole,
} from "./role.controller.js";

const router = Router();

router.use(authenticate);
router.use(requirePermission("roles.manage"));

// Retrieve roles.
router.get("/", getRoles);
router.get("/permissions", getPermissions);
router.get("/:roleId", validate(roleIdParamsSchema), getRole);

// Create, update and delete roles.
router.post("/", validate(createRoleSchema), createRole);

router.patch(
    "/:roleId",
    validate(updateRoleSchema),
    updateRole
);

router.delete(
    "/:roleId",
    validate(roleIdParamsSchema),
    deleteRole
);

// Manage role permissions.
router.put(
    "/:roleId/permissions/:permissionSlug",
    validate(rolePermissionParamsSchema),
    addRolePermission
);

router.delete(
    "/:roleId/permissions/:permissionSlug",
    validate(rolePermissionParamsSchema),
    removeRolePermission
);

// Assign and remove roles from users.
router.put(
    "/users/:userId/roles/:roleId",
    validate(userRoleParamsSchema),
    assignUserRole
);

router.delete(
    "/users/:userId/roles/:roleId",
    validate(userRoleParamsSchema),
    removeUserRole
);

export default router;
