import { removeRole } from "./role.service.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Create mock functions.
const mocks = vi.hoisted(() => ({
    findAllRoles: vi.fn(),
    findRoleById: vi.fn(),
    findRoleBySlug: vi.fn(),
    findUserById: vi.fn(),
    createRole: vi.fn(),
    updateRole: vi.fn(),
    deleteRole: vi.fn(),
    findAllPermissions: vi.fn(),
    findPermissionBySlug: vi.fn(),
    assignPermissionToRole: vi.fn(),
    removePermissionFromRole: vi.fn(),
    assignRoleToUser: vi.fn(),
    removeRoleFromUser: vi.fn(),
    resolveUserPermissions: vi.fn(),
}));

// Mock repository.
vi.mock("./role.repository.js", () => ({
    ...mocks,
}));

// Mock permission resolver.
vi.mock("../permissions/permission.service.js", () => ({
    resolveUserPermissions: mocks.resolveUserPermissions,
}));

import {
    addPermissionToRole,
    assignRole,
} from "./role.service.js";

describe("Role Service Security Tests", () => {

    beforeEach(() => {
        vi.resetAllMocks();

        // Default actor: non-admin with roles.manage.
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: false,
            permissions: ["roles.manage", "recipes.read"],
        });

        // Default custom role.
        mocks.findRoleById.mockResolvedValue({
            id: 4,
            name: "Content Editor",
            slug: "content-editor",
            isSystem: false,
            permissions: [],
            _count: {
                users: 0,
                permissions: 0,
            },
        });

        mocks.findUserById.mockResolvedValue({
            id: 2,
            name: "Dev Getnada",
            email: "dev@getnada.com",
            status: "ACTIVE",
            deletedAt: null,
        });

        mocks.findPermissionBySlug.mockImplementation(
            async (slug) => ({
                id: 1,
                name: slug,
                slug,
            })
        );

        mocks.assignPermissionToRole.mockResolvedValue({
            roleId: 4,
            permissionId: 1,
        });

        mocks.assignRoleToUser.mockResolvedValue({
            userId: 2,
            roleId: 4,
        });
    });

    it("should prevent adding permissions to system roles", async () => {
        mocks.findRoleById.mockResolvedValue({
            id: 1,
            slug: "subscriber",
            isSystem: true,
        });

        await expect(
            addPermissionToRole(2, 1, "recipes.read")
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "Permissions of system roles cannot be modified.",
        });

        expect(
            mocks.assignPermissionToRole
        ).not.toHaveBeenCalled();
    });

    it("should prevent non-admins from delegating sensitive permissions", async () => {
        await expect(
            addPermissionToRole(2, 4, "users.manage")
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "Only Admins can delegate sensitive permissions.",
        });

        expect(
            mocks.assignPermissionToRole
        ).not.toHaveBeenCalled();
    });

    it("should allow admins to delegate sensitive permissions", async () => {
        mocks.resolveUserPermissions.mockResolvedValue({
            isAdmin: true,
            permissions: [],
        });

        await expect(
            addPermissionToRole(1, 4, "users.manage")
        ).resolves.toMatchObject({
            roleId: 4,
            permissionId: 1,
        });

        expect(
            mocks.assignPermissionToRole
        ).toHaveBeenCalledOnce();
    });

    it("should prevent non-admins from delegating permissions they do not possess", async () => {
        await expect(
            addPermissionToRole(2, 4, "recipes.publish")
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "You cannot delegate a permission you do not possess.",
        });

        expect(
            mocks.assignPermissionToRole
        ).not.toHaveBeenCalled();
    });

    it("should allow non-admins to delegate permissions they possess", async () => {
        await expect(
            addPermissionToRole(2, 4, "recipes.read")
        ).resolves.toMatchObject({
            roleId: 4,
            permissionId: 1,
        });

        expect(
            mocks.assignPermissionToRole
        ).toHaveBeenCalledOnce();
    });

    it("should prevent assigning the protected Admin role", async () => {
        mocks.findRoleById.mockResolvedValue({
            id: 3,
            name: "Admin",
            slug: "admin",
            isSystem: true,
            permissions: [],
        });

        await expect(
            assignRole(1, 2, 3)
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "The protected Admin role cannot be assigned through this operation.",
        });

        expect(
            mocks.assignRoleToUser
        ).not.toHaveBeenCalled();
    });

    it("should prevent assigning a role containing unauthorized permissions", async () => {
        mocks.findRoleById.mockResolvedValue({
            id: 4,
            slug: "content-editor",
            isSystem: false,
            permissions: [
                {
                    permission: {
                        slug: "recipes.publish",
                    },
                },
            ],
        });

        await expect(
            assignRole(2, 2, 4)
        ).rejects.toMatchObject({
            statusCode: 403,
        });

        expect(mocks.assignRoleToUser).not.toHaveBeenCalled();
    });

    it("should prevent assigning roles to deleted users", async () => {
        mocks.findUserById.mockResolvedValue({
            id: 2,
            deletedAt: new Date(),
        });

        await expect(
            assignRole(1, 2, 4)
        ).rejects.toMatchObject({
            statusCode: 404,
            message: "User not found.",
        });

        expect(mocks.assignRoleToUser).not.toHaveBeenCalled();
    });

    it("should prevent removing the protected Admin role", async () => {
        mocks.findRoleById.mockResolvedValue({
            id: 3,
            slug: "admin",
            isSystem: true,
        });

        await expect(
            removeRole(1, 2, 3)
        ).rejects.toMatchObject({
            statusCode: 403,
            message: "The protected Admin role cannot be removed through this operation.",
        });

        expect(mocks.removeRoleFromUser).not.toHaveBeenCalled();
    });

});

