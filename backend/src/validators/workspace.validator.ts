import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(50, "Workspace name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(50, "Workspace name cannot exceed 50 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export const addWorkspaceMemberSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  role: z
    .enum(["ADMIN", "MEMBER", "GUEST"])
    .default("MEMBER"),
});

export const updateWorkspaceMemberSchema = z.object({
  role: z.enum([
    "ADMIN",
    "MEMBER",
    "GUEST",
  ]),
});