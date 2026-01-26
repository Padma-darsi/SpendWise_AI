export const getAIBudgetPrediction = async () => {
  const res = await axiosInstance.get("/ai/budget-prediction");
  return res.data;
};
