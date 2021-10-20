import logo from "./logo.svg";
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./components/auth/login";
import { Provider } from "react-redux";
import AppView from "./components/app-view";

import store from "./store";

function App() {
  const token = localStorage.getItem("auth_token");
  console.log(token);
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            {token ? (
              <>
                <Route path="/app" component={AppView} />
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
