import React from "react";

import { Switch, Route } from "react-router";

import PageIndex from "../pageIndex/pageIndex";
import PageLogin from "../pageLogin/pageLogin";
import PageLogout from "../pageLogout/pageLogout";
import Page404 from "./page404";
import RouteNeedLogin from "./routeNeedsLogin";

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

    <RouteNeedLogin path="/home">
      <div className="pp-first-section">
        <h1>HOME TO BE BUILT</h1>
      </div>
    </RouteNeedLogin>

    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
);

export default Routes;
