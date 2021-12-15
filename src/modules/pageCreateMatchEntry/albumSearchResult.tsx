import React, { useState } from "react";
import { SearchedAlbum } from "../../data/albumApi";

const BackupImg: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(
    src || "albumnotfound.png"
  );

  return (
    <img
      src={currentSrc}
      onError={() => setCurrentSrc("albumnotfound.png")}
      {...props}
    />
  );
};

const AlbumSearchResult: React.FunctionComponent<{ album: SearchedAlbum }> = ({
  album,
}) => (
  <div className="w-100 bg-lightish mb-2 p-2">
    <div className="d-flex align-items-start mb-1">
      <BackupImg src={album.image.medium} width="64" height="64" />
      <div className="ml-2">
        <h3 className="mb-0">{album.name}</h3>
        <span className="text-secondary">{album.artist}</span>
      </div>
      <div className="flex-grow-1" />
    </div>
    <button className="btn btn-success btn-sm btn-block align-self-stretch">
      Select me <i className="fas fa-chevron-right" />
    </button>
  </div>
);

export default AlbumSearchResult;
