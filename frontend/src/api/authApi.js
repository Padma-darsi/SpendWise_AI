import axiosInstance from "./axiosInstance";

/* ---------- REGISTER ---------- */
export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", {
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    password: data.password,
  });
};

/* ---------- LOGIN ---------- */
export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", {
    emailAddress: data.emailAddress,
    password: data.password,
  });
};
