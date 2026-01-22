import express from "express";
import {
  getAlerts,
  markAlertRead,
  generateAlertsForUser
} from "../controllers/alert.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/generate", authMiddleware, generateAlertsForUser);
router.get("/", authMiddleware, getAlerts);
router.put("/:id/read", authMiddleware, markAlertRead);

export default router;
