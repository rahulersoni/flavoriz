import { prisma } from "../src/lib/prisma.js";

try {
    const result = await prisma.$queryRaw`SELECT 1 AS connected`;

    console.log("Database connection successful!");
    console.log("Test query result:", result);
} catch (error) {
    console.error("Database connection failed.");

    console.error(error.message);

    process.exitCode = 1;
} finally {
    await prisma.$disconnect();
}
