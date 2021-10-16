import React from "react";

import "./pageIndex.css";

const PageIndex = () => (
  <>
    <section className="section-1-index">
      <h1 className="pp-box-shadow bg-white">
        Exchange albums, hear new songs, meet new people.
      </h1>
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
