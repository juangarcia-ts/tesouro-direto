import axios from "axios";
import { getToken } from "./../utils/token";

const api = axios.create({
  baseURL: "https://tesouro-direto-api.herokuapp.com/"
  // baseURL: "http://localhost:5000/"
});

api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.timeout = 60000;

api.interceptors.request.use(config => {
  const token = getToken();

  api.defaults.headers.common["x-access-token"] = token;

  if (config.headers["x-access-token"] !== token) {
    config.headers["x-access-token"] = token;
  }

  return config;
});

export default api;
