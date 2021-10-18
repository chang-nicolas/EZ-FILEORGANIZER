import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";

const { actions } = authSlice;

export const login = (values) => (dispatch) => {
  return requestFromServer
    .login(values)
    .then(({ data }) => {
      if (data.error) dispatch(actions.setError({ error: data.error }));
      else {
        console.log(data);
        dispatch(actions.setUser({ userData: data }));
        localStorage.setItem("auth_token", data.token);
      }
    })
    .catch((err) => {
      dispatch(actions.setError({ error: err }));
    });
};
