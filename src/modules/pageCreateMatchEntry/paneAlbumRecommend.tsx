import React, { useRef, useState } from "react";
import { albumSearchApi, SearchedAlbum } from "../../data/albumApi";
import { APIError } from "../../data/apiUtils";
import AlbumSearchResult from "./albumSearchResult";

const PaneAlbumReccomend = () => {
  const recommendationRef = useRef<HTMLInputElement>(null);

  const [loading, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchedAlbums, setSearchedAlbums] = useState<SearchedAlbum[] | null>(
    null
  );

  const doAlbumSearch = () => {
    const recommendation = recommendationRef.current?.value;

    if (!recommendation) {
      setError("You must enter something to search!");
      return;
    }

    setError("");
    setLoadingState(true);
    (async () => {
      try {
        const searchResults = await albumSearchApi(recommendation);
        setSearchedAlbums(searchResults);
        setLoadingState(false);
      } catch (e) {
        if (e instanceof APIError) {
          setError(e.message);
        } else {
          setError("Something went wrong. Check your internet and try again.");
        }
      }
    })();
  };

  return (
    <div className="cme-pane">
      <div className="flex-grow-1 p-3" />
      <div className="cme-box">
        <div className="cme-pane-body">
          <h5 className="text-secondary">Question 1/5</h5>
          <div className="cme-fancy-h">
            <h1>Which album do you recommend?</h1>
          </div>
          {error && (
            <div className="pp-form-error text-danger mb-2">
              <i className="fas fa-exclamation-triangle mr-1" /> {error}
            </div>
          )}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="e.g: Lorde Melodrama"
            ref={recommendationRef}
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && doAlbumSearch()}
          />
          <button
            type="button"
            className="btn btn-info btn-block mb-2"
            onClick={doAlbumSearch}
            disabled={loading}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                Search <i className="fas fa-search ml-1" />
              </>
            )}
          </button>
          <div className="text-center">
            <button className="btn btn-link p-0 mb-1">
              Click here to skip searching and enter details manually.
            </button>
          </div>
          {searchedAlbums && (
            <div className="text-break">
              Choose from albums ({searchedAlbums.length}&nbsp;found):
              <div className="album-search-list pr-1 mt-1">
                {searchedAlbums.map((album) => (
                  <AlbumSearchResult album={album} key={album.url} />
                ))}
              </div>
            </div>
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
