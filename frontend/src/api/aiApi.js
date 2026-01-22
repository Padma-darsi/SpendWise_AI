import API from "./axiosInstance";

export const predictBudget = () => API.get("/ai/predict-budget");
