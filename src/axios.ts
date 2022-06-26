import axios from "axios";
import config from "./config";

const APIClient = axios.create({
  baseURL: config.baseUrl,
});

APIClient.interceptors.request.use(
  // eslint-disable-next-line no-shadow
  (c) => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line no-param-reassign
      c.headers!.Authorization = `Bearer ${token}`;
    }
    return c;
  },
  (error) => Promise.reject(error)
);

export default APIClient;
