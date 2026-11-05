
import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const PORT = env.PORT;
const HOST = env.HOST;

let server;
let isShuttingDown = false;

async function startServer() {
    try {
        // Verify database connectivity before accepting requests.
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;

        console.log("Database connection established.");

        server = app.listen(PORT, HOST, () => {
            console.log(`Flavoriz API running at http://${HOST}:${PORT}`);
            console.log(`Health endpoint: http://${HOST}:${PORT}/api/v1/health`);
        });

        server.on("error", (error) => {
            console.error("HTTP server error:", error.message);
            process.exitCode = 1;
        });
    } catch (error) {
        console.error("Failed to start Flavoriz API:", error.message);

        await prisma.$disconnect().catch(() => { });

        process.exitCode = 1;
    }
}

async function shutdown(signal) {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    console.log(`${signal} received. Shutting down Flavoriz API...`);

    const forceExitTimer = setTimeout(() => {
        console.error("Graceful shutdown timed out.");
        process.exit(1);
    }, 10_000);

    forceExitTimer.unref();

    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        }

        await prisma.$disconnect();

        console.log("HTTP server and database connections closed.");
        process.exitCode = 0;
    } catch (error) {
        console.error("Error during shutdown:", error.message);
        process.exitCode = 1;
    } finally {
        clearTimeout(forceExitTimer);
    }
}

process.on("SIGINT", () => {
    void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});

await startServer();
