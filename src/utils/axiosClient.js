import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000", // fallback for dev
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
