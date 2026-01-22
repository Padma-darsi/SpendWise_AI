import axiosInstance from "./axiosInstance";

export const getAnalyticsSummary = () =>
  axiosInstance.get("/analytics");

export const getCategoryAnalytics = () =>
  axiosInstance.get("/analytics/category");
