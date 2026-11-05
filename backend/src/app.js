
import express from "express";
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import healthRouter from "./routes/health.routes.js";
import { env } from "./config/env.js";

import authRouter from "./modules/auth/auth.routes.js";


const app = express();

// Trust proxy only when the deployment environment requires it.
// Configure this explicitly before deploying behind a reverse proxy.
app.disable("x-powered-by");

// Security-related HTTP headers.
app.use(helmet());

// Allow requests from the configured frontend origin.
const frontendUrl = env.FRONTEND_URL;

app.use(
    cors({
        origin: frontendUrl,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    })
);

// Parse incoming request bodies with size limits.
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Parse cookies for authentication flows.
app.use(cookieParser());

// Structured HTTP logging. Never log credentials or cookies.
app.use(
    pinoHttp({
        redact: [
            "req.headers.authorization",
            "req.headers.cookie",
            "res.headers.set-cookie",
        ],
    })
);

// General API rate limit.
// Authentication routes will receive stricter limits separately.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

app.use("/api", apiLimiter);


// Basic API health endpoint.
app.use("/api/v1", healthRouter);
app.use("/api/v1/auth", authRouter);

// Handle unknown routes.
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "The requested resource was not found.",
    });
});

// Centralized error handler.
// Detailed errors should be logged server-side, not exposed to clients.
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    req.log?.error({ err }, "Unhandled application error");

    res.status(err.statusCode || 500).json({
        success: false,
        message:
            err.statusCode && err.statusCode < 500
                ? err.message
                : "Internal server error.",
        ...(err.details && { details: err.details }),
    });
});




export default app;
