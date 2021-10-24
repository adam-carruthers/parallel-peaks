import React from "react";

import { Switch, Route } from "react-router";

import PageIndex from "../pageIndex/pageIndex";
import PageLogin from "../pageLogin/pageLogin";
import PageLogout from "../pageLogout/pageLogout";
import Page404 from "./page404";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PageIndex />
    </Route>
    <Route path="/login">
      <PageLogin />
    </Route>
    <Route path="/logout">
      <PageLogout />

    </Route>

    <Route path="/home">
      {/* TODO: Make protected routes */}
      Home
    </Route>

    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
);

export default Routes;
