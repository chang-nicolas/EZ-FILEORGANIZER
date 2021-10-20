import axios from "axios";

import { API_URL } from "../../../constant";
import { auth_token } from "../getAuthToken";

const header = {
  headers: { Authorization: `${auth_token}` },
};

export const getUserList = () => {
  return axios.get(`${API_URL}/auth/users`, header);
};

export const deleteUser = (id) => {
  console.log(auth_token);
  return axios.delete(`${API_URL}/auth/${id}`, header);
};
