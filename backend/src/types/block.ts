import { z } from "zod";

export const createBlockSchema = z.object({
  type: z
    .enum([
      "PARAGRAPH",
      "HEADING_1",
      "HEADING_2",
      "HEADING_3",
      "BULLETED_LIST",
      "NUMBERED_LIST",
      "TODO",
      "QUOTE",
      "CODE",
      "DIVIDER",
      "IMAGE",
    ])
    .optional(),

  content: z.unknown().optional(),

  position: z
    .number()
    .finite()
    .optional(),
});

export const updateBlockSchema = z.object({
  type: z
    .enum([
      "PARAGRAPH",
      "HEADING_1",
      "HEADING_2",
      "HEADING_3",
      "BULLETED_LIST",
      "NUMBERED_LIST",
      "TODO",
      "QUOTE",
      "CODE",
      "DIVIDER",
      "IMAGE",
    ])
    .optional(),

  content: z.unknown().optional(),

  position: z
    .number()
    .finite()
    .optional(),
});

export type CreateBlockInput =
  z.infer<typeof createBlockSchema>;

export type UpdateBlockInput =
  z.infer<typeof updateBlockSchema>;