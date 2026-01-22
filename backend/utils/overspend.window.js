/*
  Sliding Window Overspending Detection
*/

const detectOverspending = (
  expenses,
  windowSize = 7,
  limit = 3000
) => {
  // Sort expenses by date (important)
  expenses.sort(
    (a, b) => new Date(a.expenseDate) - new Date(b.expenseDate)
  );

  let windowSum = 0;
  let left = 0;
  const alerts = [];

  for (let right = 0; right < expenses.length; right++) {
    windowSum += expenses[right].amount;

    // Maintain window size
    if (right - left + 1 > windowSize) {
      windowSum -= expenses[left].amount;
      left++;
    }

    // Check overspend
    if (windowSum > limit) {
      alerts.push({
        from: expenses[left].expenseDate,
        to: expenses[right].expenseDate,
        totalSpent: windowSum
      });
    }
  }

  return alerts;
};

export default detectOverspending;
