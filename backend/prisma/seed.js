
import { prisma } from "../src/lib/prisma.js";

const roles = [
    {
        slug: "subscriber",
        name: "Subscriber",
        description: "Can manage their account and interact with published recipes.",
        isSystem: true,
    },
    {
        slug: "contributor",
        name: "Contributor",
        description: "Can create and manage their own recipe submissions.",
        isSystem: true,
    },
    {
        slug: "admin",
        name: "Administrator",
        description: "Can manage platform content, users, settings, and permissions.",
        isSystem: true,
    },
];

const permissions = [
    ["recipes.read", "Read published recipes"],
    ["recipes.create", "Create recipes"],
    ["recipes.update_own", "Update own recipes"],
    ["recipes.submit", "Submit recipes for review"],
    ["recipes.publish", "Publish recipes directly"],
    ["recipes.manage_all", "Manage all recipes"],
    ["comments.create", "Create comments"],
    ["comments.manage_all", "Manage all comments"],
    ["bookmarks.manage_own", "Manage own bookmarks"],
    ["profile.read_own", "Read own profile"],
    ["profile.update_own", "Update own profile"],
    ["users.manage", "Manage users"],
    ["roles.manage", "Manage roles"],
    ["permissions.manage", "Manage permissions"],
    ["settings.manage", "Manage platform settings"],
];

const rolePermissions = {
    subscriber: [
        "recipes.read",
        "comments.create",
        "bookmarks.manage_own",
        "profile.read_own",
        "profile.update_own",
    ],

    contributor: [
        "recipes.read",
        "recipes.create",
        "recipes.update_own",
        "recipes.submit",
        "comments.create",
        "bookmarks.manage_own",
        "profile.read_own",
        "profile.update_own",
    ],

    admin: permissions.map(([slug]) => slug),
};

async function main() {
    // Seed default roles.
    for (const role of roles) {
        await prisma.role.upsert({
            where: { slug: role.slug },
            update: {
                name: role.name,
                description: role.description,
                isSystem: role.isSystem,
            },
            create: role,
        });
    }

    // Seed permissions.
    await prisma.permission.createMany({
        data: permissions.map(([slug, name]) => ({
            slug,
            name,
        })),
        skipDuplicates: true,
    });

    // Fetch role and permission IDs.
    const savedRoles = await prisma.role.findMany({
        where: {
            slug: { in: roles.map((role) => role.slug) },
        },
        select: {
            id: true,
            slug: true,
        },
    });

    const savedPermissions = await prisma.permission.findMany({
        where: {
            slug: { in: permissions.map(([slug]) => slug) },
        },
        select: {
            id: true,
            slug: true,
        },
    });

    const roleIds = new Map(
        savedRoles.map((role) => [role.slug, role.id])
    );

    const permissionIds = new Map(
        savedPermissions.map((permission) => [
            permission.slug,
            permission.id,
        ])
    );

    // Build role-permission relationships.
    const assignments = [];

    for (const [roleSlug, permissionSlugs] of Object.entries(rolePermissions)) {
        for (const permissionSlug of permissionSlugs) {
            assignments.push({
                roleId: roleIds.get(roleSlug),
                permissionId: permissionIds.get(permissionSlug),
            });
        }
    }

    await prisma.rolePermission.createMany({
        data: assignments,
        skipDuplicates: true,
    });

    console.log("Default roles and permissions seeded successfully.");
}

main()
    .catch((error) => {
        console.error("Failed to seed roles and permissions:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
