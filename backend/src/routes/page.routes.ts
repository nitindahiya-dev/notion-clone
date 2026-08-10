import { Router } from "express";

import { pageController } from "../controllers/page.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createPageSchema,
    updatePageSchema,
    movePageSchema,
} from "../validators/page.validator.js";

const router = Router();

/**
 * All page routes require authentication.
 */
router.use(requireAuth);

/**
 * ============================================================
 * Workspace Page Routes
 * ============================================================
 */

/**
 * Create Page
 *
 * POST /api/v1/workspaces/:workspaceId/pages
 */
router.post(
    "/workspaces/:workspaceId/pages",
    validate(createPageSchema),
    pageController.createPage,
);

/**
 * List Pages
 *
 * GET /api/v1/workspaces/:workspaceId/pages
 *
 * Optional:
 * ?parentId=<pageId>
 */
router.get(
    "/workspaces/:workspaceId/pages",
    pageController.listPages,
);

/**
 * List Trash
 *
 * GET /api/v1/workspaces/:workspaceId/pages/trash
 */
router.get(
    "/workspaces/:workspaceId/pages/trash",
    pageController.listTrash,
);

/**
 * ============================================================
 * Individual Page Routes
 * ============================================================
 */

/**
 * Get Page
 *
 * GET /api/v1/pages/:pageId
 */
router.get(
    "/pages/:pageId",
    pageController.getPage,
);

/**
 * Update Page
 *
 * PATCH /api/v1/pages/:pageId
 */
router.patch(
    "/pages/:pageId",
    validate(updatePageSchema),
    pageController.updatePage,
);

/**
 * Archive Page
 *
 * DELETE /api/v1/pages/:pageId
 */
router.delete(
    "/pages/:pageId",
    pageController.archivePage,
);

/**
 * Restore Page
 *
 * POST /api/v1/pages/:pageId/restore
 */
router.post(
    "/pages/:pageId/restore",
    pageController.restorePage,
);

/**
 * Favorite Page
 *
 * POST /api/v1/pages/:pageId/favorite
 */
router.post(
    "/pages/:pageId/favorite",
    pageController.favoritePage,
);

/**
 * Unfavorite Page
 *
 * DELETE /api/v1/pages/:pageId/favorite
 */
router.delete(
    "/pages/:pageId/favorite",
    pageController.unfavoritePage,
);

/**
 * Move Page
 *
 * POST /api/v1/pages/:pageId/move
 */
router.post(
    "/pages/:pageId/move",
    validate(movePageSchema),
    pageController.movePage,
);

export default router;