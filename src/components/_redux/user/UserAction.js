import UserSlice from "./UserSlice";
import * as requestFromServer from "./UserCrud";
import AdminSlice from "../admin/AdminSlice";

const { actions } = UserSlice;
const adminActions = AdminSlice.actions;

export const getUserList = () => (dispatch) => {
  dispatch(actions.setLoading());
  return requestFromServer
    .getUserList()
    .then(({ data }) => {
      if (data.error) dispatch(actions.setUserError({ error: data.error }));
      else dispatch(actions.setUserList({ userListData: data }));
    })
    .catch((err) => {
      dispatch(actions.setUserList({ error: err }));
    });
};

export const deleteUser = (id, title) => (dispatch) => {
  console.log(title);
  dispatch(actions.setLoading());
  console.log(id);
  return requestFromServer.deleteUser(id).then(({ data }) => {
    if (data.error) dispatch(actions.setUserError({ error: data.error }));
    else {
      console.log(data);
      if (title == "User List") dispatch(actions.deleteUser({ id: data }));
      else dispatch(adminActions.deleteAdminData({ id: data }));
    }
  });
};
