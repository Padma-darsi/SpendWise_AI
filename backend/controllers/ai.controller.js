import SW_Expense from "../models/sw.expense.model.js";
import monthlyExpenseSummary from "../utils/monthly.prefixsum.js";
import { predictNextMonthExpense } from "../ml/predictor.js";

export const getAIBudgetPrediction = async (req, res) => {
  try {
    const expenses = await SW_Expense.find({
      userRef: req.user.userId
    });

    if (expenses.length < 3) {
      return res.status(400).json({
        message: "Not enough data for prediction"
      });
    }

    const monthlyMap = monthlyExpenseSummary(expenses);
    const monthlyTotals = Object.values(monthlyMap);

    const predictedExpense =
      await predictNextMonthExpense(monthlyTotals);

    const recommendedBudget = Math.ceil(predictedExpense * 1.1);

    res.json({
      predictedExpense: Math.round(predictedExpense),
      recommendedBudget,
      message: "AI-based budget recommendation generated"
    });
  } catch (error) {
    res.status(500).json({
      message: "AI prediction failed",
      error
    });
  }
};
