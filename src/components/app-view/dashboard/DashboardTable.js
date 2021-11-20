import React from "react";
import Moment from "moment";
import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";
import { Table, Button, Input } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

import utils from "../../utils";
import * as actions from "../../_redux/file/FileAction";
import { API_URL } from "../../../constant";
import { useDispatch } from "react-redux";

function DashboardTable({ originData }) {
  const columns = [
    {
      title: "File name",
      dataIndex: "filename",
      sorter: (a, b) => utils.antdTableSorter(a, b, "filename"),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      sorter: (a, b) => utils.antdTableSorter(a, b, "tags"),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => utils.antdTableSorter(a, b, "category"),
    },
    {
      title: "Purchased",
      dataIndex: "purchased",
      sorter: (a, b) => utils.antdTableSorter(a, b, "purchased"),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
      render: (_, record) => (
        <div>{Moment(record.createdAt).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Download",
      dataIndex: "download",
      sorter: (a, b) => utils.antdTableSorter(a, b, "download"),
    },

    {
      title: "Action",
      // fixed: "right",
      render: (_, record) => (
        <div className="d-flex">
          {/* <Button type="primary" onClick={(e) => onEditClick(e, record)}>
            <EyeOutlined />
          </Button> */}
          <Button type="danger" onClick={(e) => onDeleteClick(e, record)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={(e) => onDownloadClick(e, record)}>
            <CloudDownloadOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = React.useState(originData);
  React.useEffect(() => {
    setData(originData);
  }, [originData]);

  const dispatch = useDispatch();
  function onDownloadClick(e, record) {
    fetch(`${API_URL}/file/download/${record.id}`).then((response) => {
      response.blob().then((blob) => {
        // console.log(blob, record);
        // const dataURI =
        //   "data:text/plain;base64," + encodeBase64("Hello World!");
        // saveAs(blob, "test.jpeg");
        saveFile(blob, record);
      });
      //window.location.href = response.url;
    });
  }

  const saveFile = async (blob, record) => {
    const a = document.createElement("a");
    a.download = record.originName;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  function onDeleteClick(e, record) {
    console.log(record);
    dispatch(actions.deleteFileList(record.id));
  }
  function onSearch(e) {
    const value = e.currentTarget.value;
    const searchArray = originData;
    const tmp = utils.wildCardSearch(searchArray, value);
    setData(tmp);
  }

  return (
    <>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e)}
        style={{ borderRadius: "50px", width: "30%", marginBottom: "30px" }}
      />
      <Table
        columns={columns}
        dataSource={data}
        // onChange={onChange}
        scroll={{ x: 1500 }}
      />
    </>
  );
}

export default DashboardTable;
