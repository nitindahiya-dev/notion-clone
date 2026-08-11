import { Router } from "express";

import authRoutes from "./auth.routes.js";
import workspaceRoutes from "./workspace.routes.js";
import pageRoutes from "./page.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/", pageRoutes);

export default router;