
import Alert from "../models/alert.model.js";
import Expense from "../models/sw.expense.model.js";

/* ================= GENERATE ALERTS ================= */
export const generateAlertsForUser = async (userId) => {
  const expenses = await Expense.find({ userRef: userId });
  if (!expenses.length) return;

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const BUDGET = 20000;

  /* ---------- BUDGET ALERT ---------- */
  if (totalSpent >= BUDGET * 0.9) {
    const key = "budget-warning";

    const exists = await Alert.findOne({ userRef: userId, key });

    if (!exists) {
      await Alert.create({
        userRef: userId,
        key,
        title: "Budget Alert",
        message: `You have spent ₹${totalSpent}. You are near your budget limit.`,
        type: "danger", // ✅ enum-safe
        isRead: false
      });
    }
  }

  /* ---------- CATEGORY ALERT ---------- */
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  for (const cat in categoryMap) {
    if (categoryMap[cat] > 8000) {
      const key = `category-${cat}`;

      const exists = await Alert.findOne({ userRef: userId, key });

      if (!exists) {
        await Alert.create({
          userRef: userId,
          key,
          title: "Category Overspending",
          message: `${cat} spending crossed ₹${categoryMap[cat]}`,
          type: "warning",
          isRead: false
        });
      }
    }
  }

  /* ---------- UNUSUAL EXPENSE ---------- */
  const avg = totalSpent / expenses.length;

  for (const e of expenses) {
    if (e.amount > avg * 2) {
      const key = `unusual-${e._id}`;

      const exists = await Alert.findOne({ userRef: userId, key });

      if (!exists) {
        await Alert.create({
          userRef: userId,
          key,
          title: "Unusual Expense",
          message: `High expense of ₹${e.amount} detected in ${e.category}`,
          type: "danger",
          isRead: false
        });
      }
    }
  }
};

/* ================= GET ALERTS ================= */
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userRef: req.user.userId })
      .sort({ isRead: 1, createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};

/* ================= MARK AS READ ================= */
export const markAlertRead = async (req, res) => {
  await Alert.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ message: "Marked as read" });
};
