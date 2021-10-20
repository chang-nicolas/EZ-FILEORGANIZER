import React from "react";
import { Route } from "react-router";

import Dashboard from "../dashboard";
import User from "./users";
import AdminIndex from "./admins/AdminIndex";

export default function AppRoute() {
  return (
    <>
      <Route path="/app/dashboard" component={Dashboard} />
      <Route path="/app/users" component={User} />
      <Route path="/app/admins" component={AdminIndex} />
    </>
  );
}
