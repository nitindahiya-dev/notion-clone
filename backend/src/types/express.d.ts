import "express";

import type { WorkspaceRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };

      workspace?: {
        id: string;
        role: WorkspaceRole;
      };
    }
  }
}

export {};