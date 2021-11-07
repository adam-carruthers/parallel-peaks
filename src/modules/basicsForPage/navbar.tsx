import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/hooks";
import { isUserLoggedIn, userUsername } from "../../data/userSlice";

import "./navbar.css";

const NavbarUserSection = () => {
  const userLoggedIn = useAppSelector(isUserLoggedIn);
  const username = useAppSelector(userUsername);

  if (!userLoggedIn) {
    return (
      <li className="nav-item">
        <Link to="/login" className="nav-link active" href="#">
          Login
          <i className="fas fa-user fa-lg ml-2" />
        </Link>
      </li>
    );
  } else {
    return (
      <>
        <li className="nav-item mr-3">
          <Link to="/home" className="nav-link active">
            <span className="d-none d-sm-inline">Home</span>
            <i className="fas fa-home ml-2" />
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link to="/profile" className="nav-link active">
            <span className="d-none d-sm-inline">{username}</span>
            <i className="fas fa-user fa-lg ml-2" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      </>
    );
  }
};

const Navbar = () => (
  <nav id="pp-navbar" className="navbar navbar-dark fixed-top">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand" id="pp-nav-brand">
        P<span className="d-none d-sm-inline">arallel&nbsp;</span>P
        <span className="d-none d-sm-inline">eaks</span>
      </Link>
      <ul className="nav navbar-nav flex-row ml-auto">
        <NavbarUserSection />
      </ul>
    </div>
  </nav>
);

export default Navbar;
