
import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

async function main() {
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    if (!adminEmail) {
        throw new Error(
            "INITIAL_ADMIN_EMAIL is missing from the environment."
        );
    }

    const result = await prisma.$transaction(async (tx) => {
        // Find the existing user.
        const user = await tx.user.findUnique({
            where: {
                email: adminEmail,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                emailVerifiedAt: true,
                deletedAt: true,
            },
        });

        if (!user) {
            throw new Error(
                "User not found. Register and verify the account first."
            );
        }

        // Only verified and active users can become administrators.
        if (
            user.status !== "ACTIVE" ||
            !user.emailVerifiedAt ||
            user.deletedAt
        ) {
            throw new Error(
                "The selected user must have an active, verified account."
            );
        }

        // Find the protected system Admin role.
        const adminRole = await tx.role.findUnique({
            where: {
                slug: "admin",
            },
            select: {
                id: true,
                slug: true,
                isSystem: true,
            },
        });

        if (!adminRole || !adminRole.isSystem) {
            throw new Error(
                "Protected system Admin role is missing. Run the seed script first."
            );
        }

        // Check whether an administrator already exists.
        const existingAdmin = await tx.userRole.findFirst({
            where: {
                roleId: adminRole.id,
            },
            select: {
                userId: true,
            },
        });

        if (existingAdmin) {
            if (existingAdmin.userId === user.id) {
                return {
                    alreadyAdmin: true,
                    user,
                };
            }

            throw new Error(
                "An administrator already exists. Bootstrap cannot promote another user."
            );
        }

        // Assign the Admin role.
        await tx.userRole.create({
            data: {
                userId: user.id,
                roleId: adminRole.id,
                assignedById: null,
            },
        });

        return {
            alreadyAdmin: false,
            user,
        };
    });

    if (result.alreadyAdmin) {
        console.log("This user is already a Flavoriz administrator.");
    } else {
        console.log("Initial Flavoriz administrator created successfully.");
    }

    console.log({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
    });
}

main()
    .catch((error) => {
        console.error("Admin bootstrap failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
