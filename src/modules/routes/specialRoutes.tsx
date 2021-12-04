import React, { useEffect } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "../../data/userSlice";
import Page401 from "./page401";
import { toast } from "react-toastify";

export const RouteNeedLogin = ({ children, ...rest }: RouteProps) => {
  const userLoggedIn = useSelector(isUserLoggedIn);

  return <Route {...rest}>{userLoggedIn ? children : <Page401 />}</Route>;
};

export const RouteRedirectIfLoggedIn = ({ children, ...rest }: RouteProps) => {
  // This component will only fire if the user naviagates to this page.
  // It shouldn't fire if the user is on a page and the logged in status changes.
  // This is so an error doesn't show when the user logs in and is still on the login page, about to be redirected.
  const userLoggedIn = useSelector(isUserLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (userLoggedIn) {
      toast.error("You can't access that page if you are already logged in!");
      history.push("/");
    }
  }, []);

  return <Route {...rest}>{children}</Route>;
};
