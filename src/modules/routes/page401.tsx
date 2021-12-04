import React from "react";
import NotAllowedPage from "./notAllowedPage";
import { Link, useLocation } from "react-router-dom";

const Page401 = () => {
  const location = useLocation();

  return (
    <NotAllowedPage>
      <h1>401</h1>
      <p>You need to be logged in to go to this area.</p>
      <Link
        to={{ pathname: "/login", state: { redirectUrl: location } }}
        className="btn btn-warning btn-pp pp-box-shadow-small"
      >
        Login <i className="fas fa-arrow-right ml-1" />
      </Link>
    </NotAllowedPage>
  );
};

export default Page401;
