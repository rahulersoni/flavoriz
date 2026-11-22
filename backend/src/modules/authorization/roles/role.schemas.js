import { z } from "zod";

const roleNameSchema = z
    .string()
    .trim()
    .min(2, "Role name must contain at least 2 characters.")
    .max(80, "Role name cannot exceed 80 characters.");

const roleSlugSchema = z
    .string()
    .trim()
    .min(2, "Role slug must contain at least 2 characters.")
    .max(100, "Role slug cannot exceed 100 characters.")
    .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Role slug can contain lowercase letters, numbers, and hyphens only."
    );

const roleDescriptionSchema = z
    .string()
    .trim()
    .max(500, "Role description cannot exceed 500 characters.")
    .nullable()
    .optional();

const roleIdSchema = z.coerce
    .number()
    .int()
    .positive("Role ID must be a positive integer.");

const userIdSchema = z.coerce
    .number()
    .int()
    .positive("User ID must be a positive integer.");

const permissionSlugSchema = z
    .string()
    .trim()
    .min(1, "Permission slug is required.")
    .max(191, "Permission slug is too long.");

/**
 * Create custom role.
 */
export const createRoleSchema = z.object({
    body: z.object({
        name: roleNameSchema,
        slug: roleSlugSchema,
        description: roleDescriptionSchema,
    }).strict(),
});

/**
 * Update custom role.
 */
export const updateRoleSchema = z.object({
    params: z.object({
        roleId: roleIdSchema,
    }),

    body: z.object({
        name: roleNameSchema.optional(),
        slug: roleSlugSchema.optional(),
        description: roleDescriptionSchema,
    })
        .strict()
        .refine(
            (data) => Object.keys(data).length > 0,
            {
                message: "At least one field must be provided.",
            }
        ),
});

/**
 * Validate role ID.
 */
export const roleIdParamsSchema = z.object({
    params: z.object({
        roleId: roleIdSchema,
    }),
});

/**
 * Validate user ID and role ID.
 */
export const userRoleParamsSchema = z.object({
    params: z.object({
        userId: userIdSchema,
        roleId: roleIdSchema,
    }),
});

/**
 * Validate role permission parameters.
 */
export const rolePermissionParamsSchema = z.object({
    params: z.object({
        roleId: roleIdSchema,
        permissionSlug: permissionSlugSchema,
    }),
});
