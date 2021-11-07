import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "../../data/userSlice";
import Page401 from "./page401";

const RouteNeedLogin = ({ children, ...rest }: RouteProps) => {
  const userLoggedIn = useSelector(isUserLoggedIn);

  return <Route {...rest}>{userLoggedIn ? children : <Page401 />}</Route>;
};

export default RouteNeedLogin;
