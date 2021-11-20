import pageLoadingSlice from "../_redux/pageLoading/pageLoadingSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
const { actions } = pageLoadingSlice;

export const setPageLoading = () => {
  return dispatch(actions.setPageLoading);
};

export const setPageFinished = () => {
  return dispatch(actions.setPageFinished);
};
