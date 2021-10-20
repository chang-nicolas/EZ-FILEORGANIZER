import React from "react";
import { Divider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import UserTable from "../common/UserTable";
import * as actions from "../../_redux/user/UserAction";
import { USERWHITESPACABLE_TYPES } from "@babel/types";
import Spinner from "./Spinner";

function User() {
  const dispatch = useDispatch();
  const [userDataList, setUserDataList] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.getUserList());
  }, []);

  const { userList } = useSelector((state) => ({
    userList: state.user.userList,
  }));

  const { isLoading } = useSelector((state) => ({
    isLoading: state.user.isLoading,
  }));

  React.useEffect(() => {
    setUserDataList(userList);
  }, [userList]);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const style = {
    position: "absolute",
    top: "42%",
    left: "56%",
  };

  return (
    <div>
      {loading ? (
        <Spin style={style} />
      ) : (
        <UserTable
          originData={userList}
          data={userDataList}
          setList={setUserDataList}
          title="User List"
        />
      )}
    </div>
  );
}

export default User;
