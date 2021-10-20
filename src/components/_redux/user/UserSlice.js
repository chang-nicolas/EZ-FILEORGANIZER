import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  error: null,
  isLoading: false,
};

const UserSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    setUserList: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload.userListData;
      state.error = null;
    },
    deleteUser: (state, action) => {
      state.isLoading = false;
      state.userList = state.userList.filter((x) => x.id != action.payload.id);
    },
    setUserError: (state, action) => {
      state.isLoading = false;
      state.userList = null;
      state.error = action.payload.error;
    },
  },
});

export default UserSlice;
