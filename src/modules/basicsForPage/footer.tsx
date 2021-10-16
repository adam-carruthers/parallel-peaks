import React from "react";

import "./footer.css";

// TODO: Make footer correct with working links

const Footer = () => (
  <div className="footer-basic">
    <footer>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="/">Home</a>
        </li>
        <li className="list-inline-item">
          <a href="/">Services</a>
        </li>
        <li className="list-inline-item">
          <a href="/">About</a>
        </li>
        <li className="list-inline-item">
          <a href="/">Terms</a>
        </li>
        <li className="list-inline-item">
          <a href="/">Privacy Policy</a>
        </li>
      </ul>
      <p className="copyright">Company Name © 2017</p>
    </footer>
  </div>
);

export default Footer;
