import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
  return (
    <>
      <CustomJumboTron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra super heroes y villanos"
      />

      <CustomBreadCrumbs
        currentPage="Buscador de heroes"
        // breadcrumbs={[
        //   { label: "Home", to: "/" },
        //   { label: "Home", to: "/" },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
