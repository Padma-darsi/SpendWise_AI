import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "spend-wise-ai-psi.vercel.app/api"
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN BEING SENT 👉", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;

