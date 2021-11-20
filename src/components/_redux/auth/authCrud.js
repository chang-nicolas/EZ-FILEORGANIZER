import axios from "axios";

import { API_URL } from "../../../constant";

export function login(values) {
  console.log(values);
  return axios.post(`${API_URL}/auth/login`, values);
}

export function register(values) {
  console.log(values);
  return axios.post(`${API_URL}/auth/register`, values);
}
