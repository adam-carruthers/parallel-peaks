import React from "react";

import "./navbar.css";

// TODO: Convert href to Link when you have added react-router

const Navbar = () => (
  <nav id="pp-navbar" className="navbar navbar-dark fixed-top">
    <div className="container-fluid">
      <a href="/" className="navbar-brand" id="pp-nav-brand">
        P<span className="d-none d-sm-inline">arallel&nbsp;</span>P
        <span className="d-none d-sm-inline">eaks</span>
      </a>
      <ul className="nav navbar-nav flex-row ml-auto">To be implemented...</ul>
    </div>
  </nav>
);

export default Navbar;
