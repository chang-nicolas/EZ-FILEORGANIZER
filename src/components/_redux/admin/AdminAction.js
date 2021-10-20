import * as requestFromServer from "./AdminCrud";
import AdminSlice from "./AdminSlice";

const { actions } = AdminSlice;

export const getAdminList = () => (dispatch) => {
  dispatch(actions.setLoading);
  return requestFromServer.getAdmins().then(({ data }) => {
    if (data.error) dispatch(actions.setError({ error: data.error }));
    else dispatch(actions.setAdminList({ adminData: data }));
  });
};

export const addAdminData = (values) => (dispatch) => {
  // dispatch(actions.setLoading);
  return requestFromServer.addAdmin(values).then(({ data }) => {
    console.log(data.data);
    if (data.error) dispatch(actions.setError({ error: data.error }));
    else dispatch(actions.addAdminData({ adminData: data.data }));
  });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.setLoading());
  console.log(id);
  return requestFromServer.deleteUser(id).then(({ data }) => {
    if (data.error) dispatch(actions.setError({ error: data.error }));
    else {
      console.log(data);
      dispatch(actions.deleteAdminData({ id: data }));
    }
  });
};
