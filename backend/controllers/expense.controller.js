import SW_Expense from "../models/sw.expense.model.js";

/* ---------- ADD EXPENSE ---------- */
export const addExpense = async (req, res) => {
  try {
    const { amount, category, note, expenseDate } = req.body;

    if (!amount || !category || !expenseDate) {
      return res.status(400).json({
        message: "Amount, category, and date are required"
      });
    }

    const newExpense = await SW_Expense.create({
      userRef: req.user.userId,
      amount,
      category,
      note,
      expenseDate
    });

    return res.status(201).json({
      message: "Expense added successfully",
      expenseId: newExpense._id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add expense",
      error
    });
  }
};

/* ---------- GET USER EXPENSES ---------- */
export const getUserExpenses = async (req, res) => {
  try {
    const expenses = await SW_Expense.find({
      userRef: req.user.userId
    }).sort({ expenseDate: -1 });

    return res.json({
      count: expenses.length,
      expenses
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch expenses",
      error
    });
  }
};


export const updateExpense = async (req, res) => {
  try {
    const updated = await SW_Expense.findOneAndUpdate(
      { _id: req.params.id, userRef: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await SW_Expense.findOneAndDelete({
      _id: req.params.id,
      userRef: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
