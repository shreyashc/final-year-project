import axios from "axios";
import { BASE_URL } from "../constants";

let apiClient = axios.create({
  baseURL: BASE_URL,
});

let tokenInterceptor: any = null;

export const setClientToken = (token: string) => {
  tokenInterceptor = apiClient.interceptors.request.use(function (config) {
    if (config && config.headers && config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export const removeClientTokenInterceptor = () => {
  if (tokenInterceptor !== null) {
    apiClient.interceptors.request.eject(tokenInterceptor);
  }
};

export default apiClient;
