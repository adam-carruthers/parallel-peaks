import React from "react";
import NotAllowedPage from "./notAllowedPage";
import { Link } from "react-router-dom";

// TODO: Make it so that when you're logged in it gives you the option of going to your profile/matching home

const Page404 = () => (
  <NotAllowedPage>
    <h1>404</h1>
    <p>Page not found. You appear to have taken a wrong turn...</p>
    <div className="make-children-blocky">
      <Link to="/" className="btn btn-warning btn-pp">
        Go to the front page <i className="fas fa-arrow-right ml-1" />
      </Link>
    </div>
  </NotAllowedPage>
);

export default Page404;
