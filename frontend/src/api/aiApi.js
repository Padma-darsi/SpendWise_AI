import API from "./axiosInstance";

export const predictBudget = async () => {
  const res = await API.get("/ai/predict-budget");
  return res.data;
};
