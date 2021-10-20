import React from "react";
import "./style.scss";

import DrawerCreateForm from "./DrawerCreateForm";
import DrawerEditForm from "./DrawerEditForm";

function DrawerForm({ onClose, record }) {
  return (
    <div>
      {record ? (
        <DrawerEditForm onClose={onClose} record={record} />
      ) : (
        <DrawerCreateForm onClose={onClose} />
      )}
    </div>
  );
}

export default DrawerForm;
