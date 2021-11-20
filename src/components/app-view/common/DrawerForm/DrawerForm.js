import React from "react";
import "./style.scss";

import DrawerCreateForm from "./DrawerCreateForm";
import DrawerEditForm from "./DrawerEditForm";

function DrawerForm({ onClose, record }) {
  return (
    <div>
      {record.firstname == "" ? (
        <DrawerCreateForm onClose={onClose} />
      ) : (
        <DrawerEditForm onClose={onClose} record={record} />
      )}
    </div>
  );
}

export default DrawerForm;
