import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://spend-wise-ai-phi.vercel.app/api"
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

