import express from "express";
import {
  getExpenseAnalytics,
  getCategoryAnalytics
} from "../controllers/analytics.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* SUMMARY CARDS */
router.get("/", authMiddleware, getExpenseAnalytics);

/* CATEGORY WISE */
router.get("/category", authMiddleware, getCategoryAnalytics);

export default router;

