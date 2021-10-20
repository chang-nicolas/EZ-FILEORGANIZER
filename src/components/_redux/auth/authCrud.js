import axios from "axios";

import { API_URL } from "../../../constant";

export function login(values) {
  return axios.post(`${API_URL}/auth/login`, values);
}

export function register(values) {
  return axios.post(`${API_URL}/auth/register`, values);
}
