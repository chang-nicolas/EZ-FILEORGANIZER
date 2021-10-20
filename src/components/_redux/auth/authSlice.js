import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.userData;
      state.isAuthenticated = true;
      state.error = null;
    },

    setError: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },

    singOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export default authSlice;
