import React, { useState } from "react";
import "./pageCreateMatchEntry.css";
import PaneAlbumReccomend from "./paneAlbumRecommend";

const PageCreateMatchEntry = () => {
  const totalPages = 2;
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const scrollByNumberOfPages = (change: number) => {
    setCurrentPosition(currentPosition + change);
  };

  return (
    <div className="pp-first-section bg-blue-waves">
      <div className="cme-outer">
        <button
          className="btn cme-arrow cme-arrow-left"
          onClick={() => scrollByNumberOfPages(-1)}
          disabled={currentPosition === 0}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className="btn cme-arrow cme-arrow-right"
          onClick={() => scrollByNumberOfPages(1)}
          disabled={currentPosition === totalPages - 1}
        >
          <i className="fas fa-chevron-right" />
        </button>
        <div
          className="cme-panes-container"
          style={{ marginLeft: `-${currentPosition * 100}vw` }}
        >
          <PaneAlbumReccomend />
          <div className="cme-pane">
            <div className="flex-grow-1 p-3" />
            <div className="cme-box">
              <h1>Create matching entry</h1>
            </div>
            <div className="flex-grow-1 p-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreateMatchEntry;
