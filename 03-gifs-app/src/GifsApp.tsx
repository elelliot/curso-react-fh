import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Gif Searcher"
        description="Find and Share the perfect GIF"
      />

      {/* Search */}
      <SearchBar placeholder="Search Gifs" />

      {/* Previous Searches */}
      <PreviousSearches searches={["CyberPunk 2077", "Resident Evil"]} />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
