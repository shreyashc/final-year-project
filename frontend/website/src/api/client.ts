import axios from "axios";
import { BASE_URL } from "../constants";

let apiClient = axios.create({
  baseURL: BASE_URL,
});

export { apiClient };
