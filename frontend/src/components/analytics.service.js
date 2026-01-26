// api/analytics.js
export const getAIBudgetPrediction = async () => {
  const res = await axiosInstance.get("/ai/predict-budget");
  return res.data;
};
