import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["cyberpunk 2077"]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string) => {
    console.log({ query });
  };
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Gif Searcher"
        description="Find and Share the perfect GIF"
      />

      {/* Search */}
      <SearchBar placeholder="Search Gifs" onQuery={handleSearch} />

      {/* Previous Searches */}
      <PreviousSearches
        searches={previousTerms}
        // onLabelClicked={(term: string) => handleTermClicked(term)}
        onLabelClicked={handleTermClicked} // Es lo mismo que lo de arriba
      />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
