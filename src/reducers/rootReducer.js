import { combineReducers } from "redux";

import { authSlice } from "../components/_redux/auth/authSlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
});

export default reducer;
