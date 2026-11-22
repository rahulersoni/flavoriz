import { z } from "zod";

const emailSchema = z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(254, "Email is too long.")
    .pipe(
        z.email({
            error: "Enter a valid email address."
        })
    )
    .transform((email) => email.toLowerCase());

const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters.");

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must contain at least 2 characters.")
            .max(80, "Name cannot exceed 80 characters."),

        email: emailSchema,
        password: passwordSchema,
    })
    .strict();

export const loginSchema = z
    .object({
        email: emailSchema,

        // Don't trim or transform passwords.
        password: z
            .string()
            .min(1, "Password is required.")
            .max(128, "Invalid email or password."),
    })
    .strict();

export const forgotPasswordSchema = z
    .object({
        email: emailSchema,
    })
    .strict();

export const resetPasswordSchema = z
    .object({
        token: z.string().min(1, "Reset token is required."),
        password: passwordSchema,
    })
    .strict();

export const verifyEmailSchema = z
    .object({
        token: z.string().trim().min(1, "Verification token is required."),
    })
    .strict();


export const userPermissionParamsSchema = z.object({
    userId: z.coerce.number().int().positive(),
    permissionSlug: z.string().trim().min(1).max(191).optional(),
}).strict();

export const setUserPermissionSchema = z.object({
    isGranted: z.boolean(),
}).strict();
