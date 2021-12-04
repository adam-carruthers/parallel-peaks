import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/hooks";
import { isUserLoggedIn, userMatchEntry } from "../../data/userSlice";

import "./pageIndex.css";

// TODO: Make it so that the menu changes when you're logged in

const PageIndexInner = () => {
  const userLoggedIn = useAppSelector(isUserLoggedIn);
  const hasMatchEntry = !!useAppSelector(userMatchEntry);

  if (userLoggedIn) {
    return (
      <>
        <Link to="/home" className="btn btn-pr btn-pp-ls option-index">
          Go to your home <i className="fas fa-arrow-right ml-auto" />
        </Link>
        <Link to="/profile" className="btn btn-py btn-pp-ls option-index">
          See your profile <i className="fas fa-arrow-right ml-auto" />
        </Link>
        {!hasMatchEntry && (
          <Link
            to="/create-match-entry"
            className="btn btn-pg btn-pp-ls option-index"
          >
            Create match entry <i className="fas fa-arrow-right ml-auto" />
          </Link>
        )}
      </>
    );
  } else {
    return (
      <>
        <Link to="/sign-up" className="btn btn-py btn-pp-ls option-index">
          Sign up to be matched <i className="fas fa-arrow-right ml-auto" />
        </Link>
        <Link to="/login" className="btn btn-pr btn-pp-ls option-index">
          Login to your account <i className="fas fa-arrow-right ml-auto" />
        </Link>
      </>
    );
  }
};

const PageIndex = () => (
  <>
    <section className="section-1-index">
      <h1 className="pp-box-shadow bg-white">
        Exchange albums, hear new songs, meet new people.
      </h1>
      <PageIndexInner />
      <a href="#about-us-index" className="btn btn-pb btn-pp-ls option-index">
        Find out more about us <i className="fas fa-arrow-down ml-auto" />
      </a>
    </section>
    <section>
      <div id="about-us-index" className="container pt-4 pb-4">
        <h1>About us</h1>
        <p className="font-alice">
          In this section we will explain who we are and stuff. When I get round
          to it that is... {/* TODO: Get round to it lol */}
        </p>
      </div>
    </section>
  </>
);

export default PageIndex;
