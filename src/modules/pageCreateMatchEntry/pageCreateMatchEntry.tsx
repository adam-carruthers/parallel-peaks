import React, { useRef, useState } from "react";
import "./pageCreateMatchEntry.css";

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
          className="cme-pages-container"
          style={{ marginLeft: `-${currentPosition * 100}vw` }}
        >
          <div className="cme-page">
            <div className="flex-grow-1 p-3" />
            <div className="cme-box">
              <div className="cme-page-body">
                <h5 className="text-secondary">Question 1/5</h5>
                <div className="cme-fancy-h">
                  <h1>Which album do you recommend?</h1>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g: Lorde Melodrama"
                />
              </div>
              <div className="cme-footer">
                Create Matching Entry{" "}
                <i className="text-nowrap">- Question 1/5</i>
              </div>
            </div>
            <div className="flex-grow-1 p-3" />
          </div>
          <div className="cme-page">
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
