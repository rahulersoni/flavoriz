
import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("../src/lib/prisma.js", () => ({
    prisma: {
        $queryRaw: vi.fn(),
    },
}));

import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

describe("Flavoriz API", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /api/v1/health", () => {
        it("returns 200 when the API is running", async () => {
            const response = await request(app)
                .get("/api/v1/health");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                status: "ok",
                message: "Flavoriz API is running.",
            });
        });
    });

    describe("GET /api/v1/ready", () => {
        it("returns 200 when the database is available", async () => {
            prisma.$queryRaw.mockResolvedValue([{ connected: 1 }]);

            const response = await request(app)
                .get("/api/v1/ready");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                status: "ready",
                checks: {
                    database: "connected",
                },
            });

            expect(prisma.$queryRaw).toHaveBeenCalledOnce();
        });

        it("returns 503 when the database is unavailable", async () => {
            prisma.$queryRaw.mockRejectedValue(
                new Error("Simulated database failure")
            );

            const response = await request(app)
                .get("/api/v1/ready");

            expect(response.status).toBe(503);
            expect(response.body).toEqual({
                success: false,
                status: "not_ready",
                checks: {
                    database: "unavailable",
                },
            });
        });
    });

    describe("Unknown routes", () => {
        it("returns 404 for an unknown endpoint", async () => {
            const response = await request(app)
                .get("/api/v1/does-not-exist");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false,
                message: "The requested resource was not found.",
            });
        });
    });
});
