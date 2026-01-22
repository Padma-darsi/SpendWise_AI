/*
  Hashing-based aggregation
  Time Complexity: O(n)
*/

const aggregateByCategory = (expenses) => {
  const categoryMap = {};

  for (let expense of expenses) {
    const category = expense.category;

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }

    categoryMap[category] += expense.amount;
  }

  return categoryMap;
};

export default aggregateByCategory;
