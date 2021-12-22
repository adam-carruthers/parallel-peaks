import React, { useRef, useState } from "react";
import { albumSearchApi, SearchedAlbum } from "../../data/albumApi";
import { APIError } from "../../data/apiUtils";
import ScrollOnMountDiv from "../../misc/scrollOnMountDiv";
import AlbumSearchResult from "./albumSearchResult";

const AlbumSearch: React.FC<{ useManual: () => void }> = ({ useManual }) => {
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
    <>
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
        <button className="btn btn-link p-0 mb-1" onClick={useManual}>
          {searchedAlbums === null
            ? "Click here to skip searching and enter details manually."
            : "Can't find what you're looking for? Click here to enter the details manually (no search)."}
        </button>
      </div>
      {searchedAlbums &&
        (searchedAlbums.length === 0 ? (
          <div className="text-center py-3">
            <b>Couldn&apos;t find any albums for that search.</b> <br />
            Do a new search or enter the details manually.
          </div>
        ) : (
          <div className="text-break">
            Choose from albums ({searchedAlbums.length}&nbsp;found):
            <ScrollOnMountDiv>
              <div className="album-search-list pr-1 mt-1 mb-3">
                {searchedAlbums.map((album) => (
                  <AlbumSearchResult album={album} key={album.url} />
                ))}
              </div>
            </ScrollOnMountDiv>
            <button className="btn btn-danger btn-block" disabled>
              Choose an album to be able to carry on
            </button>
          </div>
        ))}
    </>
  );
};

export default AlbumSearch;
