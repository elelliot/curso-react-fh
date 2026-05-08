import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  // Podemos usar diferentes instancias de custom hooks
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

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
      <GifList gifs={gifs} />
    </>
  );
};
