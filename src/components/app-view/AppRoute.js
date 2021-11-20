import React from "react";
import { Route } from "react-router";

import Dashboard from "./dashboard/DashboardIndex";
import User from "./users";
import AdminIndex from "./admins/AdminIndex";
import UploadIndex from "./upload/UploadIndex";
// import UploadForm from "./upload/UploadForm";

export default function AppRoute() {
  return (
    <>
      <Route path="/app/dashboard" component={Dashboard} />
      <Route path="/app/users" component={User} />
      <Route path="/app/admins" component={AdminIndex} />
      <Route path="/app/upload" component={UploadIndex} />
    </>
  );
}
