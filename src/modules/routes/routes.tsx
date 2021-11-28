import React from "react";

import { Switch, Route } from "react-router";
import { RouteNeedLogin, RouteRedirectIfLoggedIn } from "./specialRoutes";

import PageIndex from "../pageIndex/pageIndex";
import PageLogin from "../pageLogin/pageLogin";
import Page404 from "./page404";
import PageSignUp from "../pageSignUp/pageSignUp";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PageIndex />
    </Route>

    <RouteRedirectIfLoggedIn path="/login">
      <PageLogin />
    </RouteRedirectIfLoggedIn>
    <RouteRedirectIfLoggedIn path="/sign-up">
      <PageSignUp />
    </RouteRedirectIfLoggedIn>

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
