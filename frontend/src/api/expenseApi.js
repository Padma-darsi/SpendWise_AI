import axiosInstance from "./axiosInstance";

/* ---------- GET EXPENSES ---------- */
export const getExpenses = () => {
  return axiosInstance.get("/expenses");
};

/* ---------- ADD EXPENSE ---------- */
export const addExpense = (data) => {
  return axiosInstance.post("/expenses/add", data);
};

/* ---------- UPDATE EXPENSE ---------- */
export const updateExpense = (id, data) => {
  return axiosInstance.put(`/expenses/${id}`, data);
};

/* ---------- DELETE EXPENSE ---------- */
export const deleteExpense = (id) => {
  return axiosInstance.delete(`/expenses/${id}`);
};
