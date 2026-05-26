import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      <CustomJumboTron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra super heroes y villanos"
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
