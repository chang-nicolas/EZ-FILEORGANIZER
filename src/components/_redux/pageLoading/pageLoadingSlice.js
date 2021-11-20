import { createSlice } from "@reduxjs/toolkit";

initialState = {
  isLoading: false,
};

const pageLoadingSlice = createSlice({
  name: "pageLoading",
  initialState: initialState,
  reducers: {
    setPageLoading: (state, action) => {
      isLoading: true;
    },
    setPageFinished: (state, action) => {
      isLoading: false;
    },
  },
});

export default pageLoadingSlice;
