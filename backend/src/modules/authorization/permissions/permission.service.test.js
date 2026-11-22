
import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
    userFindUnique: vi.fn(),
}));

vi.mock("../../../lib/prisma.js", () => ({
    prisma: {
        user: {
            findUnique: mocks.userFindUnique,
        },
    },
}));

import { resolveUserPermissions } from "./permission.service.js";

describe("Permission Resolver Tests", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should return null when the user does not exist", async () => {
        mocks.userFindUnique.mockResolvedValue(null);

        await expect(
            resolveUserPermissions(999)
        ).resolves.toBeNull();
    });

    it("should resolve permissions inherited from a single role", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "subscriber",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "comments.create" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [],
        });

        await expect(
            resolveUserPermissions(2)
        ).resolves.toEqual({
            isAdmin: false,
            permissions: [
                "recipes.read",
                "comments.create",
            ],
        });
    });

    it("should combine permissions inherited from multiple roles", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "subscriber",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "comments.create" } },
                        ],
                    },
                },
                {
                    role: {
                        slug: "content-editor",
                        isSystem: false,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "recipes.create" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [],
        });

        await expect(
            resolveUserPermissions(2)
        ).resolves.toEqual({
            isAdmin: false,
            permissions: [
                "recipes.read",
                "comments.create",
                "recipes.create",
            ],
        });
    });

    it("should add a permission through an explicit grant override", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "subscriber",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [
                {
                    isGranted: true,
                    permission: {
                        slug: "recipes.publish",
                    },
                },
            ],
        });

        await expect(
            resolveUserPermissions(2)
        ).resolves.toEqual({
            isAdmin: false,
            permissions: [
                "recipes.read",
                "recipes.publish",
            ],
        });
    });

    it("should remove an inherited permission through an explicit denial override", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "subscriber",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "comments.create" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [
                {
                    isGranted: false,
                    permission: {
                        slug: "comments.create",
                    },
                },
            ],
        });

        await expect(
            resolveUserPermissions(2)
        ).resolves.toEqual({
            isAdmin: false,
            permissions: [
                "recipes.read",
            ],
        });
    });

    it("should return each permission only once", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "subscriber",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "comments.create" } },
                        ],
                    },
                },
                {
                    role: {
                        slug: "content-editor",
                        isSystem: false,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "recipes.create" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [
                {
                    isGranted: true,
                    permission: {
                        slug: "recipes.read",
                    },
                },
            ],
        });

        const result = await resolveUserPermissions(2);

        expect(result.permissions).toEqual([
            "recipes.read",
            "comments.create",
            "recipes.create",
        ]);

        expect(result.permissions).toHaveLength(3);
    });

    it("should identify a protected system Admin role", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "admin",
                        isSystem: true,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                            { permission: { slug: "users.manage" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [],
        });

        await expect(
            resolveUserPermissions(1)
        ).resolves.toEqual({
            isAdmin: true,
            permissions: [
                "recipes.read",
                "users.manage",
            ],
        });
    });

    it("should not identify a custom role named admin as a protected Admin role", async () => {
        mocks.userFindUnique.mockResolvedValue({
            roles: [
                {
                    role: {
                        slug: "admin",
                        isSystem: false,
                        permissions: [
                            { permission: { slug: "recipes.read" } },
                        ],
                    },
                },
            ],
            permissionOverrides: [],
        });

        await expect(
            resolveUserPermissions(2)
        ).resolves.toEqual({
            isAdmin: false,
            permissions: [
                "recipes.read",
            ],
        });
    });
});
