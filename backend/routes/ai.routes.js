import express from "express";
import { getAIBudgetPrediction } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/predict-budget", authMiddleware, getAIBudgetPrediction);

export default router;
