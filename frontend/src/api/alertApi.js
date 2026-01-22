import API from "./axiosInstance";

export const getOverspendAlerts = () => API.get("/alerts/overspend");
