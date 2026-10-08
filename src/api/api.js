import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://https://restaurant-backend-production-b36b.up.railway.app";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { API_BASE_URL };
export default api;