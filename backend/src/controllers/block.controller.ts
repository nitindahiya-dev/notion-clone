import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { BlockService } from "../services/block.service.js";
import { sendSuccess } from "../utils/response.js";

const getParam = (
  value: string | string[] | undefined,
  name: string,
): string => {
  if (
    typeof value !== "string" ||
    !value
  ) {
    throw new Error(
      `Missing route parameter: ${name}`,
    );
  }

  return value;
};

export class BlockController {
  private blockService =
    new BlockService();

  /**
   * POST /pages/:pageId/blocks
   */
  createBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const pageId = getParam(
        req.params.pageId,
        "pageId",
      );

      const userId = req.user!.id;

      const block =
        await this.blockService.createBlock(
          pageId,
          userId,
          req.body,
        );

      return sendSuccess(
        res,
        block,
        201,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /pages/:pageId/blocks
   */
  listBlocks = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const pageId = getParam(
        req.params.pageId,
        "pageId",
      );

      const userId = req.user!.id;

      const blocks =
        await this.blockService.listBlocks(
          pageId,
          userId,
        );

      return sendSuccess(
        res,
        blocks,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /blocks/:blockId
   */
  getBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const blockId = getParam(
        req.params.blockId,
        "blockId",
      );

      const userId = req.user!.id;

      const block =
        await this.blockService.getBlock(
          blockId,
          userId,
        );

      return sendSuccess(
        res,
        block,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /blocks/:blockId
   */
  updateBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const blockId = getParam(
        req.params.blockId,
        "blockId",
      );

      const userId = req.user!.id;

      const block =
        await this.blockService.updateBlock(
          blockId,
          userId,
          req.body,
        );

      return sendSuccess(
        res,
        block,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /blocks/:blockId
   */
  archiveBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const blockId = getParam(
        req.params.blockId,
        "blockId",
      );

      const userId = req.user!.id;

      const block =
        await this.blockService.archiveBlock(
          blockId,
          userId,
        );

      return sendSuccess(
        res,
        block,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /blocks/:blockId/restore
   */
  restoreBlock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const blockId = getParam(
        req.params.blockId,
        "blockId",
      );

      const userId = req.user!.id;

      const block =
        await this.blockService.restoreBlock(
          blockId,
          userId,
        );

      return sendSuccess(
        res,
        block,
      );
    } catch (error) {
      next(error);
    }
  };
}

export const blockController =
  new BlockController();