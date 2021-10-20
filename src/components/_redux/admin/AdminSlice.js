import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminList: null,
  isLoading: false,
  error: null,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    setAdminList: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.adminList = action.payload.adminData;
    },
    addAdminData: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.adminList = [...state.adminList, action.payload.adminData];
    },
    deleteAdminData: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.adminList = state.adminList.filter(
        (x) => x.id != action.payload.id
      );
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.adminList = null;
    },
  },
});

export default AdminSlice;
