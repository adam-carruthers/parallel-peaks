import React from "react";

const ManualAlbum: React.FC<{ useSearch: () => void }> = ({ useSearch }) => {
  return (
    <>
      <div className="text-center">
        <button className="btn btn-link p-0 mb-2" onClick={useSearch}>
          Click here to go back to doing a search for your album.
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="album-title">Album title</label>
        <input
          className="form-control"
          id="album-title"
          name="albumTitle"
          type="text"
          placeholder="E.g: Melodrama"
        />
        <div className="text-danger" />
      </div>
      <div className="form-group">
        <label htmlFor="artist-name">Artist name</label>
        <input
          className="form-control"
          id="artist-name"
          name="artistName"
          type="text"
          placeholder="E.g: Lorde"
        />
        <div className="text-danger" />
      </div>
      <button className="btn btn-danger btn-block">
        Submit and continue <i className="fas fa-chevron-right ml-1" />
      </button>
    </>
  );
};

export default ManualAlbum;
