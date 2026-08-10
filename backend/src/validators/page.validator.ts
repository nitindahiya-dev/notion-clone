import { z } from "zod";

/**
 * Create Page
 */
export const createPageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      1,
      "Page title cannot be empty",
    )
    .max(
      200,
      "Page title cannot exceed 200 characters",
    ),

  parentId: z
    .string()
    .uuid("Invalid parent page ID")
    .nullable()
    .optional(),

  icon: z
    .string()
    .trim()
    .max(
      20,
      "Icon cannot exceed 20 characters",
    )
    .nullable()
    .optional(),
});

/**
 * Update Page
 */
export const updatePageSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(
        1,
        "Page title cannot be empty",
      )
      .max(
        200,
        "Page title cannot exceed 200 characters",
      )
      .optional(),

    icon: z
      .string()
      .trim()
      .max(
        20,
        "Icon cannot exceed 20 characters",
      )
      .nullable()
      .optional(),

    cover: z
      .string()
      .trim()
      .url("Invalid cover URL")
      .nullable()
      .optional(),

    parentId: z
      .string()
      .uuid("Invalid parent page ID")
      .nullable()
      .optional(),

    position: z
      .number()
      .finite("Position must be a finite number")
      .optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).length > 0,
    {
      message:
        "At least one field is required",
    },
  );

/**
 * Move Page
 */
export const movePageSchema = z.object({
  parentId: z
    .string()
    .uuid("Invalid parent page ID")
    .nullable()
    .optional(),

  position: z
    .number()
    .finite("Position must be a finite number")
    .optional(),
});