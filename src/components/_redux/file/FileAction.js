import * as requestFromServer from "./FileCrud";
import FileSlice from "./FileSlice";

const { actions } = FileSlice;

export const getFileList = (userId) => (dispatch) => {
  console.log(userId);
  return requestFromServer.getFileList(userId).then(({ data }) => {
    console.log(data);
    if (data.error) dispatch(actions.setError({ error: data.error }));
    else dispatch(actions.setFileList({ fileList: data.data }));
  });
};

export const deleteFileList = (id) => (dispatch) => {
  return requestFromServer.deleteFileList(id).then(({ data }) => {
    if (data.error) dispatch(actions.setError({ error: data.error }));
    else dispatch(actions.deleteFileList({ id: data }));
  });
};

export const downLoadFile = (record) => (dispatch) => {
  return requestFromServer.downLoadFile(record);
};
