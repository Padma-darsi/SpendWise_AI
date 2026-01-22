
import Alert from "../models/alert.model.js";
import Expense from "../models/sw.expense.model.js";

export const generateAlertsForUser = async (userId) => {
  const expenses = await Expense.find({ userRef: userId });

  if (!expenses.length) return;

  const alerts = [];

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const BUDGET = 20000;

  
  if (totalSpent >= BUDGET * 0.9) {
    alerts.push({
      userRef: userId,
      title: "Budget Alert",
      message: `You have spent ₹${totalSpent}. You are near your budget limit.`,
      type: "danger",
      isRead: false
    });
  }

  
  const categoryMap = {};

  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  for (const cat in categoryMap) {
    if (categoryMap[cat] > 8000) {
      alerts.push({
        userRef: userId,
        title: "Category Overspending",
        message: `${cat} spending crossed ₹${categoryMap[cat]}`,
        type: "warning",
        isRead: false
      });
    }
  }

  
  const avg = totalSpent / expenses.length;

  expenses.forEach((e) => {
    if (e.amount > avg * 2) {
      alerts.push({
        userRef: userId,
        title: "Unusual Expense",
        message: `High expense of ₹${e.amount} detected in ${e.category}`,
        type: "danger",
        isRead: false
      });
    }
  });

  
  alerts.push({
    userRef: userId,
    title: "Monthly Summary",
    message: `You spent ₹${totalSpent} this month.`,
    type: "info",
    isRead: false
  });

  // 🔥 IMPORTANT: RESET OLD ALERTS
  await Alert.deleteMany({ userRef: userId });
  await Alert.insertMany(alerts);
};


export const getAlerts = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 🔥 AUTO GENERATE ALERTS
    await generateAlertsForUser(userId);

    const alerts = await Alert.find({ userRef: userId })
      .sort({ isRead: 1, createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};


export const markAlertRead = async (req, res) => {
  await Alert.findByIdAndUpdate(req.params.id, {
    isRead: true
  });

  res.json({ message: "Marked as read" });
};


