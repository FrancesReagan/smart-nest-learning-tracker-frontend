import axios from "axios";

export const backendClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});


// added to simple backendClient code//
// add request interceptor to include auth token//
backendClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add response interceptor for error handling//
backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid//
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);