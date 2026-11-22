
import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
    findUserForPermissionManagement: vi.fn(),
    findUserPermissionOverrides: vi.fn(),
    findPermissionBySlug: vi.fn(),
    upsertUserPermissionOverride: vi.fn(),
    deleteUserPermissionOverride: vi.fn(),
    resolveUserPermissions: vi.fn(),
}));

vi.mock("../../auth/auth.repository.js", () => ({
    ...mocks,
}));

vi.mock("./permission.service.js", () => ({
    resolveUserPermissions: mocks.resolveUserPermissions,
}));

import {
    getUserPermissionConfiguration,
    setUserPermissionOverride,
    removeUserPermissionOverride,
} from "./permission-management.service.js";

describe("Permission Management Service Tests", () => {
    beforeEach(() => {
        vi.resetAllMocks();

        // Default actor is Admin.
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: true,
            permissions: [],
        });

        // Default target user is not an Admin.
        mocks.findUserForPermissionManagement.mockResolvedValue({
            id: 2,
            name: "Dev Getnada",
            roles: [],
        });

        mocks.findPermissionBySlug.mockImplementation(async (slug) => ({
            id: 10,
            name: slug,
            slug,
        }));

        mocks.upsertUserPermissionOverride.mockResolvedValue({
            userId: 2,
            permissionId: 10,
            isGranted: true,
        });

        mocks.deleteUserPermissionOverride.mockResolvedValue({
            count: 1,
        });

        mocks.findUserPermissionOverrides.mockResolvedValue([]);
    });

    it("should allow Admins to grant a permission", async () => {
        await expect(
            setUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.publish",
                isGranted: true,
            })
        ).resolves.toMatchObject({
            userId: 2,
            permissionId: 10,
            isGranted: true,
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).toHaveBeenCalledWith({
            userId: 2,
            permissionId: 10,
            isGranted: true,
            assignedById: 1,
        });
    });

    it("should allow Admins to deny a permission", async () => {
        mocks.upsertUserPermissionOverride.mockResolvedValue({
            userId: 2,
            permissionId: 10,
            isGranted: false,
        });

        await expect(
            setUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.publish",
                isGranted: false,
            })
        ).resolves.toMatchObject({
            isGranted: false,
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).toHaveBeenCalledWith({
            userId: 2,
            permissionId: 10,
            isGranted: false,
            assignedById: 1,
        });
    });

    it("should prevent non-admins from granting sensitive permissions", async () => {
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: false,
            permissions: ["permissions.manage"],
        });

        await expect(
            setUserPermissionOverride({
                actorId: 3,
                targetUserId: 2,
                permissionSlug: "users.manage",
                isGranted: true,
            })
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "Only Admins can grant sensitive permissions.",
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).not.toHaveBeenCalled();
    });

    it("should allow non-admins to grant ordinary permissions", async () => {
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: false,
            permissions: ["permissions.manage"],
        });

        await expect(
            setUserPermissionOverride({
                actorId: 3,
                targetUserId: 2,
                permissionSlug: "recipes.read",
                isGranted: true,
            })
        ).resolves.toMatchObject({
            isGranted: true,
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).toHaveBeenCalledOnce();
    });

    it("should allow non-admins to deny sensitive permissions", async () => {
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: false,
            permissions: ["permissions.manage"],
        });

        mocks.upsertUserPermissionOverride.mockResolvedValue({
            userId: 2,
            permissionId: 10,
            isGranted: false,
        });

        await expect(
            setUserPermissionOverride({
                actorId: 3,
                targetUserId: 2,
                permissionSlug: "users.manage",
                isGranted: false,
            })
        ).resolves.toMatchObject({
            isGranted: false,
        });
    });

    it("should prevent users from modifying their own permissions", async () => {
        await expect(
            setUserPermissionOverride({
                actorId: 2,
                targetUserId: 2,
                permissionSlug: "recipes.read",
                isGranted: true,
            })
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "You cannot modify your own permissions.",
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).not.toHaveBeenCalled();
    });

    it("should prevent overrides on protected administrators", async () => {
        mocks.findUserForPermissionManagement.mockResolvedValue({
            id: 2,
            roles: [
                {
                    role: {
                        slug: "admin",
                        isSystem: true,
                    },
                },
            ],
        });

        await expect(
            setUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.read",
                isGranted: true,
            })
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "Permissions of protected administrators cannot be overridden.",
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).not.toHaveBeenCalled();
    });

    it("should allow Admins to remove a permission override", async () => {
        await expect(
            removeUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.read",
            })
        ).resolves.toEqual({
            removed: true,
        });

        expect(
            mocks.deleteUserPermissionOverride
        ).toHaveBeenCalledWith({
            userId: 2,
            permissionId: 10,
        });
    });

    it("should return false when no override was removed", async () => {
        mocks.deleteUserPermissionOverride.mockResolvedValue({
            count: 0,
        });

        await expect(
            removeUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.read",
            })
        ).resolves.toEqual({
            removed: false,
        });
    });

    it("should reject invalid isGranted values", async () => {
        await expect(
            setUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "recipes.read",
                isGranted: "true",
            })
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "isGranted must be a boolean value.",
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).not.toHaveBeenCalled();
    });

    it("should reject unknown permissions", async () => {
        mocks.findPermissionBySlug.mockResolvedValue(null);

        await expect(
            setUserPermissionOverride({
                actorId: 1,
                targetUserId: 2,
                permissionSlug: "unknown.permission",
                isGranted: true,
            })
        ).rejects.toMatchObject({
            statusCode: 404,
            message: "Permission not found.",
        });

        expect(
            mocks.upsertUserPermissionOverride
        ).not.toHaveBeenCalled();
    });

    it("should return a user's effective permissions and overrides", async () => {
        mocks.resolveUserPermissions.mockImplementation(async (userId) => {
            if (userId === 1) {
                return {
                    isAdmin: true,
                    permissions: [],
                };
            }

            return {
                isAdmin: false,
                permissions: ["recipes.read"],
            };
        });

        mocks.findUserPermissionOverrides.mockResolvedValue([
            {
                permission: {
                    slug: "recipes.read",
                },
                isGranted: false,
                assignedBy: {
                    id: 1,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const result = await getUserPermissionConfiguration(1, 2);

        expect(result.userId).toBe(2);
        expect(result.effectivePermissions).toEqual(["recipes.read"]);
        expect(result.overrides).toHaveLength(1);
        expect(result.overrides[0].isGranted).toBe(false);
    });
});
