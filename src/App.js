import logo from "./logo.svg";
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./components/auth/login";
import { Provider, useSelector } from "react-redux";
import appView from "./components/app-view";

import Dashboard from "./components/dashboard";

import store from "./store";
import { Layout } from "antd";

function App() {
  const token = localStorage.getItem("auth_token");

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            {token ? (
              <>
                <Route path="/app/dashboard" component={appView} />
                <Redirect to="/app/dashboard" />
              </>
            ) : (
              <>
                <Route path="/auth/login" component={Login} />
                <Redirect to="/auth/login" />
              </>
            )}
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
