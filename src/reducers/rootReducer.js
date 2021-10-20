import { combineReducers } from "redux";

import authSlice from "../components/_redux/auth/authSlice";
import UserSlice from "../components/_redux/user/UserSlice";
import AdminSlice from "../components/_redux/admin/AdminSlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
  user: UserSlice.reducer,
  admin: AdminSlice.reducer,
});

export default reducer;
