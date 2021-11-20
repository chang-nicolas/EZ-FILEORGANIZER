import React from "react";
import { Drawer, Button } from "antd";

class DrawerPanel extends React.Component {
  state = { visible: false, childrenDrawer: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  render() {
    return (
      <>
        <Drawer
          title="Multi-level drawer"
          width={520}
          // closable={false}
          // onClose={this.onClose}
          visible={this.props.visible}
        ></Drawer>
      </>
    );
  }
}

export default DrawerPanel;
