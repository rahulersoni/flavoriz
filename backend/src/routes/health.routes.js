import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "ok",
        message: "Flavoriz API is running.",
    });
});

router.get("/ready", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        return res.status(200).json({
            success: true,
            status: "ready",
            checks: {
                database: "connected",
            },
        });
    } catch (error) {
        req.log?.error({ err: error }, "Database readiness check failed");

        return res.status(503).json({
            success: false,
            status: "not_ready",
            checks: {
                database: "unavailable",
            },
        });
    }
});

export default router;