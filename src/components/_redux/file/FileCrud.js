import axios from "axios";

import { API_URL } from "../../../constant";

export const getFileList = (userId) => {
  return axios.post(`${API_URL}/file/getFileList`, { userId });
};

export const deleteFileList = (id) => {
  return axios.delete(`${API_URL}/file/deleteFile/${id}`);
};

export const downLoadFile = (record) => {
  return axios.post(`${API_URL}/file/download`, record);
};
