import UserSlice from "./UserSlice";
import * as requestFromServer from "./UserCrud";

const { actions } = UserSlice;

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

export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.setLoading());
  console.log(id);
  return requestFromServer.deleteUser(id).then(({ data }) => {
    if (data.error) dispatch(actions.setUserError({ error: data.error }));
    else {
      console.log(data);
      dispatch(actions.deleteUser({ id: data }));
    }
  });
};
