import React from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";

import { Table, Button, Input, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { titleStyle } from "../../../constant";
import utils from "../../utils";
import * as actions from "../../_redux/user/UserAction";
import DrawerPanel from "./DrawerForm/DrawerPanel";
import DrawerForm from "./DrawerForm/DrawerForm";

function UserTable({ originData, data, setList, title }) {
  const columns = [
    {
      title: "First name",
      dataIndex: "firstname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
    },
    {
      title: "Last name",
      dataIndex: "lastname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Phone number",
      dataIndex: "phonenumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "phonenumber"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => utils.antdTableSorter(a, b, "address"),
    },
    {
      title: "Birth Date",
      // dataIndex: "birthdate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "birthdate"),
      render: (_, record) => (
        <div>{Moment(record.birthdate).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => utils.antdTableSorter(a, b, "role"),
    },
    {
      title: "Action",
      fixed: "right",
      render: (_, record) => (
        <div className="d-flex">
          <Button type="primary" onClick={(e) => onEditClick(e, record)}>
            <EyeOutlined />
          </Button>
          <Button type="danger" onClick={(e) => userDelete(e, record)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const [selectedRecord, setSelectedRecord] = React.useState(false);
  const dispatch = useDispatch();
  const showDrawer = React.useRef(null);

  function userDelete(e, record) {
    message.loading({ content: "Deleting...", key });
    const myPromise = new Promise(async (resolve, reject) => {
      await dispatch(actions.deleteUser(record.id));
      resolve("finished");
      reject("error");
    });
    myPromise.then((msg) => {
      console.log(msg);
      message.success({ content: "Deleted!", key, duration: 2 });
    });
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  function onSearch(e) {
    const value = e.currentTarget.value;
    const searchArray = originData;
    const tmp = utils.wildCardSearch(searchArray, value);
    setList(tmp);
  }

  const key = "updatable";
  const [panel, setPanel] = React.useState("form");

  async function onAddClick() {
    await setSelectedRecord(null);
    setPanel("form");
    showDrawer.current();
  }

  async function onEditClick(e, record) {
    await setSelectedRecord(record);
    setPanel("info");
    showDrawer.current();
  }

  return (
    <div>
      <h1 style={titleStyle}>{title}</h1>
      {title == "Admin List" ? (
        <Button
          type="primary"
          style={{
            marginTop: "22px",
            borderRadius: "50px",
            marginRight: "5px",
          }}
          onClick={() => onAddClick()}
          icon={<PlusOutlined />}
        >
          Add admin
        </Button>
      ) : (
        ""
      )}
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e)}
        style={{ borderRadius: "50px", width: "30%", marginBottom: "30px" }}
      />
      <DrawerPanel
        showInfo={showDrawer}
        title={"Account info"}
        record={selectedRecord}
        panel={panel}
        setPanel={setPanel}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        scroll={{ x: 1500 }}
      />
    </div>
  );
}

export default UserTable;
