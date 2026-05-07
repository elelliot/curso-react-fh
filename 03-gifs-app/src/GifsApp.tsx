import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["cyberpunk2077"]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string) => {
    // Remove whitespaces on start and end, and go lowercase
    const term = query.trim().toLowerCase();
    // Query shouldn't be empty (first step helps for this)
    if (!term) return;

    // If term is already included in previousItems, then we do nothing
    if (previousTerms.includes(term)) return;

    // Otherwise we set it to the start of array, only 8 items can be shown so we remove the last item after adding the new one
    setPreviousTerms((prevItems) => {
      prevItems = [term, ...prevItems];
      return prevItems.slice(0, 8);
    });
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
