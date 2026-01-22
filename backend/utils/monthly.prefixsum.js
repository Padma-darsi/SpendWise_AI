/*
  Prefix Sum for month-wise totals
*/

const monthlyExpenseSummary = (expenses) => {
  const prefixMap = {};

  for (let expense of expenses) {
    const date = new Date(expense.expenseDate);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!prefixMap[monthKey]) {
      prefixMap[monthKey] = 0;
    }

    prefixMap[monthKey] += expense.amount;
  }

  return prefixMap;
};

export default monthlyExpenseSummary;
