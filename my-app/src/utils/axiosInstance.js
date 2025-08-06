import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://qosyl-project-backend.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (typeof window !== "undefined") {
      if (status === 401) window.location.href = "/unauthorized";
      else if (status === 403) window.location.href = "/forbidden";
      else if (status >= 500) window.location.href = "/server-error";
      else if (status === 404) window.location.href = "/not-found";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
