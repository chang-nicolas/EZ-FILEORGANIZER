import React from "react";
import { useSelector } from "react-redux";
import md5 from "md5";
import { useDispatch } from "react-redux";
import { Image, Button } from "antd";

import "./style.scss";
import * as actions from "../../_redux/file/FileAction";
import DashboardTable from "./DashboardTable";

function Dashboard() {
  const dispatch = useDispatch();
  const [fileList, setFileList] = React.useState();
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  React.useEffect(() => {
    dispatch(actions.getFileList(user.id));
  }, []);

  const { fileListData } = useSelector((state) => ({
    fileListData: state.file.fileList,
  }));

  React.useEffect(() => {
    setFileList(fileListData);
  }, [fileListData]);

  const hash = md5(String(user.email).trim().toLowerCase());
  const userGravatar = `http://www.gravatar.com/avatar/${hash}`;
  return (
    <div>
      {userGravatar ? (
        <Image width={200} style={{ borderRadius: "50%" }} src={userGravatar} />
      ) : (
        <h1 style={{ color: "white" }}>
          {user.firstname.charAt(0).toUpperCase() +
            user.lastname.charAt(0).toUpperCase()}
        </h1>
      )}
      <h1 className="welcome-title">Welcome {user.firstname}</h1>
      <DashboardTable originData={fileList} />
    </div>
  );
}

export default Dashboard;
