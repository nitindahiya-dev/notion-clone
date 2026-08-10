import type { Request, Response, NextFunction } from "express";

import { PageService } from "../services/page.service.js";
import { sendSuccess } from "../utils/response.js";

const getParam = (
    value: string | string[] | undefined,
    name: string,
): string => {
    if (typeof value !== "string" || !value) {
        throw new Error(`Missing route parameter: ${name}`);
    }

    return value;
};

export class PageController {
    private pageService = new PageService();



    /**
     * POST /workspaces/:workspaceId/pages
     */
    createPage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const workspaceId = getParam(
                req.params.workspaceId,
                "workspaceId",
            );
            const userId = req.user!.id;

            const page = await this.pageService.createPage(
                workspaceId,
                userId,
                req.body,
            );

            return sendSuccess(
                res,
                page,
                201,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /workspaces/:workspaceId/pages
     */
    listPages = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const workspaceId = getParam(
                req.params.workspaceId,
                "workspaceId",
            );

            const userId = req.user!.id;

            const parentId =
                typeof req.query.parentId === "string"
                    ? req.query.parentId
                    : undefined;

            const pages =
                await this.pageService.listPages(
                    workspaceId,
                    userId,
                    parentId,
                );

            return sendSuccess(
                res,
                pages,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /pages/:pageId
     */
    getPage = async (
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

            const page =
                await this.pageService.getPage(
                    pageId,
                    userId,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * PATCH /pages/:pageId
     */
    updatePage = async (
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

            const page =
                await this.pageService.updatePage(
                    pageId,
                    userId,
                    req.body,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /pages/:pageId/move
     */
    movePage = async (
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

            const page =
                await this.pageService.movePage(
                    pageId,
                    userId,
                    req.body,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * DELETE /pages/:pageId
     */
    archivePage = async (
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

            const page =
                await this.pageService.archivePage(
                    pageId,
                    userId,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /pages/:pageId/restore
     */
    restorePage = async (
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

            const page =
                await this.pageService.restorePage(
                    pageId,
                    userId,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /pages/:pageId/favorite
     */
    favoritePage = async (
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

            const page =
                await this.pageService.favoritePage(
                    pageId,
                    userId,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * DELETE /pages/:pageId/favorite
     */
    unfavoritePage = async (
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

            const page =
                await this.pageService.unfavoritePage(
                    pageId,
                    userId,
                );

            return sendSuccess(
                res,
                page,
            );
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /workspaces/:workspaceId/pages/trash
     */
    listTrash = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const workspaceId = getParam(
                req.params.workspaceId,
                "workspaceId",
            );

            const userId = req.user!.id;

            const pages =
                await this.pageService.listTrash(
                    workspaceId,
                    userId,
                );

            return sendSuccess(
                res,
                pages,
            );
        } catch (error) {
            next(error);
        }
    };
}

export const pageController =
    new PageController();