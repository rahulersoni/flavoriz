
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    HOST: z.string().min(1).default("127.0.0.1"),

    PORT: z.coerce.number().int().min(1).max(65535).default(5000),

    FRONTEND_URL: z.string().url().default("http://localhost:5173"),

    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().min(1).max(65535),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string().min(1),

    DATABASE_URL: z.string().min(1),

    ACCESS_TOKEN_SECRET: z.string().min(32),
    CSRF_SECRET: z.string().min(64),
    ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
    REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number().int().min(1).max(90).default(30),
    REFRESH_TOKEN_COOKIE_NAME: z.string().min(1).default("flavoriz_refresh"),

    RESEND_API_KEY: z.string().min(30),
    MAIL_FROM: z.string().min(30),
    RESEND_REGISTRATION_EMAIL: z.string().pipe(
        z.email({
            error: "Enter a valid email address."
        })
    )
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Invalid environment configuration:");

    for (const issue of result.error.issues) {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    }

    throw new Error(
        "Environment validation failed. Check your backend .env file."
    );
}

export const env = Object.freeze(result.data);
