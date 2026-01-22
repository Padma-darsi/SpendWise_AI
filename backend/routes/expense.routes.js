import express from "express";
import {
  addExpense,
  getUserExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.get("/", authMiddleware, getUserExpenses);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;

