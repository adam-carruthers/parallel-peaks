import React, { useCallback, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { APIError } from "../../data/apiUtils";
import { useAppDispatch } from "../../data/hooks";
import { loginApi } from "../../data/userApi";
import { login } from "../../data/userSlice";

import "./pageLogin.css";

// TODO: Implement redirect if logged in
// TODO: Implement forgot password

const PageLoginInner = () => {
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [loginError, setLoginError] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<undefined | { redirectUrl?: string }>();

  const onLoginSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      setLoginStatus("error");
      setLoginError("You must enter a username and password.");
      return;
    }

    setLoginStatus("loading");
    (async () => {
      try {
        const loginJson = await loginApi(username, password);
        dispatch(login(loginJson));
        history.push(location?.state?.redirectUrl || "/home");
      } catch (e) {
        console.error(e);
        setLoginStatus("error");
        if (e instanceof APIError) {
          setLoginError(e.message);
        } else {
          setLoginError(
            "There was an error, check your internet and try again."
          );
        }
      }
    })();
  }, []);

  return (
    <form onSubmit={onLoginSubmit}>
      <fieldset disabled={loginStatus === "loading"}>
        {loginStatus === "error" && (
          <div className="pp-form-error text-danger mb-2">
            <i className="fas fa-exclamation-triangle mr-1" /> {loginError}
          </div>
        )}
        <div className="form-group">
          <input
            ref={usernameRef}
            className="form-control"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            ref={passwordRef}
            className="form-control"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value={loginStatus === "loading" ? "Loading..." : "Login"}
          />
        </div>
      </fieldset>
    </form>
  );
};

const PageLogin = () => (
  <section className="pp-first-section bg-blue-waves d-flex flex-column align-items-center">
    <div className="flex-grow-1 p-3" />
    <div className="box-login pp-box-shadow bg-white">
      <h1 className="pp-box-shadow pp-brand-shadow bg-primary big-logo">PP</h1>
      <div className="mb-3 text-center text-small">
        <h1 className="mb-3">Login</h1>
        <span className="text-muted">Not got an account yet? </span>
        <Link to="/sign-up">Sign up here.</Link>
      </div>
      <PageLoginInner />
    </div>
    <div className="flex-grow-1 p-4" />
  </section>
);

export default PageLogin;
