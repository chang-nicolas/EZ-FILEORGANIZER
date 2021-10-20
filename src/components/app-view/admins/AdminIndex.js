import React from "react";
import { Row, Col, Button, Spin } from "antd";
import LeftOutlined from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { titleStyle } from "../../../constant";
import UserTable from "../common/UserTable";
import * as actions from "../../_redux/admin/AdminAction";

function AdminIndex() {
  const dispatch = useDispatch();
  const [adminDataList, setAdminDataList] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.getAdminList());
  }, []);

  const { adminList } = useSelector((state) => ({
    adminList: state.admin.adminList,
  }));
  console.log(adminList);

  const { isLoading } = useSelector((state) => ({
    isLoading: state.admin.isLoading,
  }));

  React.useEffect(async () => {
    await setAdminDataList(adminList);
  }, [adminList]);

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
          originData={adminList}
          data={adminDataList}
          setList={setAdminDataList}
          title="Admin List"
        />
      )}
    </div>
  );
}

export default AdminIndex;
