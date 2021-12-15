import { APIError } from "./apiUtils";

const albumApiKey = "ca7d4fbd4ce3b5c62152ab6c2ba5c718";
const albumBaseUrl = `http://ws.audioscrobbler.com/2.0/?api_key=${albumApiKey}&format=json`;

export interface SearchedAlbumUncleaned {
  name: string;
  artist: string;
  url: string;
  image: Array<{ size: string; "#text": string }>;
}

export interface SearchedAlbum {
  name: string;
  artist: string;
  url: string;
  image: {
    small: string;
    medium: string;
    large: string;
    extralarge: string;
  };
}

export const albumSearchApi = async (
  searchQuery: string
): Promise<SearchedAlbum[]> => {
  const response = await fetch(
    `${albumBaseUrl}&method=album.search&album=${encodeURIComponent(
      searchQuery
    )}`
  );
  const searchJson = await response.json();

  if (response.status !== 200) {
    console.error(searchJson);
    if (searchJson.error === 26 || searchJson.error === 29) {
      throw new APIError(
        "Unavailable - Sorry, the search API is unavailable right now. Please enter your album manually."
      );
    } else {
      throw new APIError(
        "Something went wrong. Check your search term and try again. Alternately, enter your album manually."
      );
    }
  }

  return searchJson.results.albummatches.album.map(
    ({ image, ...album }: SearchedAlbumUncleaned): SearchedAlbum => ({
      ...album,
      image: {
        small: image[0]["#text"],
        medium: image[1]["#text"],
        large: image[2]["#text"],
        extralarge: image[3]["#text"],
      },
    })
  );
};
