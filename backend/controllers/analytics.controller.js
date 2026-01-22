import SW_Expense from "../models/sw.expense.model.js";

/* ================= TOTAL ANALYTICS ================= */
export const getExpenseAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const expenses = await SW_Expense.find({ userRef: userId });

    const totalAmount = expenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    const totalCount = expenses.length;

    return res.json({
      totalExpenses: totalCount,
      totalSpent: totalAmount
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({
      message: "Failed to fetch analytics"
    });
  }
};

/* ================= CATEGORY ANALYTICS ================= */
export const getCategoryAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const categoryData = await SW_Expense.aggregate([
      {
        $match: {
          userRef: userId
        }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          category: "$_id",
          totalAmount: 1,
          _id: 0
        }
      }
    ]);

    return res.json(categoryData);
  } catch (error) {
    console.error("Category analytics error:", error);
    return res.status(500).json({
      message: "Failed to fetch category analytics"
    });
  }
};
