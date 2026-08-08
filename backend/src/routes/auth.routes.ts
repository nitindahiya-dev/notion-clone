import { Router } from "express";

import {
  register,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate.middleware";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";

import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register,
);

router.post(
  "/login",
  validate(loginSchema),
  login,
);

router.post(
  "/refresh",
  refresh,
);

router.post(
  "/logout",
  logout,
);

router.get(
  "/me",
  requireAuth,
  me,
);

export default router;