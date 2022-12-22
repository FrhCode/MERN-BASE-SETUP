import axios from "axios";
import { API_URL } from "../variable";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
