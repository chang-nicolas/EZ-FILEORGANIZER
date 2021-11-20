import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileList: null,
  error: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    setFileList: (state, action) => {
      state.fileList = action.payload.fileList;
      console.log(state.fileList);
      state.error = null;
    },
    setError: (state, action) => {
      state.fileList = null;
      state.error = action.payload.error;
    },
    deleteFileList: (state, action) => {
      console.log(action.payload.id);
      state.fileList = state.fileList.filter((x) => x.id != action.payload.id);
      console.log(state.fileList);
      state.error = null;
    },
  },
});

export default fileSlice;
