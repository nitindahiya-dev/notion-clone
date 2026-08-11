import { Router } from "express";

import { blockController } from "../controllers/block.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/pages/:pageId/blocks",
  blockController.createBlock,
);

router.get(
  "/pages/:pageId/blocks",
  blockController.listBlocks,
);

router.get(
  "/blocks/:blockId",
  blockController.getBlock,
);

router.patch(
  "/blocks/:blockId",
  blockController.updateBlock,
);

router.delete(
  "/blocks/:blockId",
  blockController.archiveBlock,
);

router.post(
  "/blocks/:blockId/restore",
  blockController.restoreBlock,
);

export default router;