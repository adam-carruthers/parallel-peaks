import React, { useState } from "react";
import { SearchedAlbum } from "../../data/albumApi";
import "./pageCreateMatchEntry.css";
import PaneAlbumReccomend from "./paneAlbumRecommend";

const PageCreateMatchEntry = () => {
  const totalPages = 2;
  const [currentPane, setCurrentPane] = useState<number>(0);

  const [selectedAlbum, setSelectedAlbum] = useState<SearchedAlbum | null>(
    null
  );

  return (
    <div className="pp-first-section bg-blue-waves">
      <div className="cme-outer">
        <button
          className="btn cme-arrow cme-arrow-left"
          onClick={() => setCurrentPane(currentPane - 1)}
          disabled={currentPane === 0}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className="btn cme-arrow cme-arrow-right"
          onClick={() => setCurrentPane(currentPane + 1)}
          disabled={currentPane === totalPages - 1}
        >
          <i className="fas fa-chevron-right" />
        </button>
        <div
          className="cme-panes-container"
          style={{ marginLeft: `-${currentPane * 100}vw` }}
        >
          <PaneAlbumReccomend
            selectedAlbum={selectedAlbum}
            setSelectedAlbum={setSelectedAlbum}
          />
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
