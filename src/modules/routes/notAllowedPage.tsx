import React from "react";
import "./notAllowedPage.css";

const NotAllowedPage = ({ children }: { children: React.ReactNode }) => (
  <section className="pp-first-section bg-not-allowed d-flex flex-column align-items-center">
    <div className="flex-grow-1" />
    <div className="box-not-allowed">{children}</div>
    <div className="flex-grow-1 p-4" />
  </section>
);

export default NotAllowedPage;
