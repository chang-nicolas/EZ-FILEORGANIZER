import axios from "axios";
import { API_URL } from "../../../constant";
import { auth_token } from "../getAuthToken";

const header = {
  headers: { Authorization: `${auth_token}` },
};

export const getAdmins = () => {
  return axios.get(`${API_URL}/auth/admins`, header);
};

export function addAdmin(values) {
  // console.log(values);
  return axios.post(`${API_URL}/auth/add-admin`, values);
}

export const deleteUser = (id) => {
  console.log(auth_token);
  return axios.delete(`${API_URL}/auth/${id}`, header);
};
