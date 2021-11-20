import React from "react";
import { Drawer, Button, Select, Space } from "antd";
import DrawerForm from "./DrawerForm";
import DrawerInfo from "./DrawerInfo";

function DrawerPanel({ showInfo, title, record, panel, setPanel }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    showInfo.current = showDrawer;
  }, []);

  function showDrawer() {
    setVisible(true);
  }

  async function onClose() {
    await setVisible(false);
  }

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {panel == "form" ? (
          <DrawerForm onClose={onClose} record={record} />
        ) : (
          <DrawerInfo record={record} setPanel={setPanel} onClose={onClose} />
        )}
      </Drawer>
    </>
  );
}

export default DrawerPanel;
