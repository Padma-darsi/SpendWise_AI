import axiosInstance from "./axiosInstance";

export const getAIBudgetPrediction = async () => {
  const res = await axiosInstance.get("/ai/predict-budget");
  return res.data;
};
