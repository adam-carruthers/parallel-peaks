import React from "react";

import { Switch, Route } from "react-router";

import PageIndex from "../pageIndex/pageIndex";
import Page404 from "./page404";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PageIndex />
    </Route>

    <Route path="*">
      <Page404 />
    </Route>
  </Switch>
);

export default Routes;
