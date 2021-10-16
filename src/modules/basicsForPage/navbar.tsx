import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => (
  <nav id="pp-navbar" className="navbar navbar-dark fixed-top">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand" id="pp-nav-brand">
        P<span className="d-none d-sm-inline">arallel&nbsp;</span>P
        <span className="d-none d-sm-inline">eaks</span>
      </Link>
      <ul className="nav navbar-nav flex-row ml-auto">To be implemented...</ul>
    </div>
  </nav>
);

export default Navbar;
