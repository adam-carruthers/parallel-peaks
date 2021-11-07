import React from "react";

import { Switch, Route } from "react-router";
import RouteNeedLogin from "./routeNeedsLogin";

import PageIndex from "../pageIndex/pageIndex";
import PageLogin from "../pageLogin/pageLogin";
import Page404 from "./page404";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PageIndex />
    </Route>
    <Route path="/login">
      <PageLogin />
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
