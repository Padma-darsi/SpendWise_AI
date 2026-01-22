/*
  Sorting categories by expense amount
*/

const sortCategoriesByAmount = (categoryMap) => {
  const sortedArray = Object.entries(categoryMap);

  sortedArray.sort((a, b) => b[1] - a[1]);

  return sortedArray;
};

export default sortCategoriesByAmount;
