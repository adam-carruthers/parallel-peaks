import React, { useState } from "react";
import { SearchedAlbum } from "../../data/albumApi";
import AlbumSearch from "./albumSearch";
import ManualAlbum from "./manualAlbum";

const PaneAlbumReccomend: React.FC<{
  selectedAlbum: SearchedAlbum | null;
  setSelectedAlbum: (album: SearchedAlbum | null) => void;
}> = () => {
  const [usingManual, setUsingManual] = useState<boolean>(false);

  return (
    <div className="cme-pane">
      <div className="flex-grow-1 p-3" />
      <div className="cme-box">
        <div className="cme-pane-body">
          <h5 className="text-secondary">Question 1/5</h5>
          <div className="cme-fancy-h">
            <h1>Which album do you recommend?</h1>
          </div>
          {usingManual ? (
            <ManualAlbum useSearch={() => setUsingManual(false)} />
          ) : (
            <AlbumSearch useManual={() => setUsingManual(true)} />
          )}
        </div>
        <div className="cme-footer">
          Create Matching Entry <i className="text-nowrap">- Question 1/5</i>
        </div>
      </div>
      <div className="flex-grow-1 p-3" />
    </div>
  );
};

export default PaneAlbumReccomend;
