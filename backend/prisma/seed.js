
import { prisma } from "../src/lib/prisma.js";

const roles = [
    {
        slug: "subscriber",
        name: "Subscriber",
        description: "Can manage their account and interact with published recipes.",
    },
    {
        slug: "contributor",
        name: "Contributor",
        description: "Can create and manage their own recipe submissions.",
    },
    {
        slug: "admin",
        name: "Administrator",
        description: "Can manage platform content, users, settings, and permissions.",
    },
];

async function main() {
    for (const role of roles) {
        await prisma.role.upsert({
            where: { slug: role.slug },
            update: {
                name: role.name,
                description: role.description,
            },
            create: role,
        });
    }

    console.log("Default Flavoriz roles seeded successfully.");
}

main()
    .catch((error) => {
        console.error("Failed to seed default roles:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
