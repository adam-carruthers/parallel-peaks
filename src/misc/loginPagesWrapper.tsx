import React from "react";
import "./loginPagesWrapper.css";

const LoginPagesWrapper: React.FunctionComponent<{
  pageName: string;
  topOfPageInfo?: React.ReactNode;
}> = ({ children, topOfPageInfo, pageName }) => (
  <section className="pp-first-section bg-blue-waves d-flex flex-column align-items-center">
    <div className="flex-grow-1 p-3" />
    <div className="box-login-pages pp-box-shadow bg-white">
      <h1 className="pp-box-shadow pp-brand-shadow bg-primary big-logo">PP</h1>
      <div className="mb-3 text-center text-small">
        <h1 className="mb-3">{pageName}</h1>
        {topOfPageInfo}
      </div>
      {children}
    </div>
    <div className="flex-grow-1 p-4" />
  </section>
);

export default LoginPagesWrapper;
