import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.userData;
      state.isAuthenticated = true
      state.error = null
    },

    setError: (state, action) => {
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload.error
    }
  },
});
