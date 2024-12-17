import axios from "axios";
import { getToken } from "./storage";

// Base URL configuration
const instance = axios.create({
  baseURL: "http://192.168.8.38:8080",
});

// Request Interceptor: Add Bearer Token
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
