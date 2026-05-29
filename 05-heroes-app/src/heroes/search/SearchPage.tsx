import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroStats } from "../components/HeroStats";
import { HeroGrid } from "../components/HeroGrid";
import { SearchControls } from "./ui/SearchControls";
import { searchHeroes } from "../actions/search-heroes.action";
import { Card, CardContent } from "@/components/ui/card";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  // const team = searchParams.get("team") ?? undefined;
  // const category = searchParams.get("category") ?? undefined;
  // const universe = searchParams.get("universe") ?? undefined;
  // const status = searchParams.get("status") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: heroes = [], isLoading } = useQuery({
    queryKey: [
      "hero-search",
      // { name, team, category, universe, status, strength },
      { name, strength },
    ],
    queryFn: () =>
      searchHeroes({
        name,
        strength,
      }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumboTron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra super heroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Buscador de heroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      {/* HeroGrid */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card className="p-0 w-96" key={index}>
              <CardContent className="p-0">
                <Skeleton className="aspect-video size-96" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {heroes.length > 0 && <HeroGrid heroes={heroes} />}
      {heroes.length === 0 && (
        <div>
          <h2>No se encontraron heroes</h2>
        </div>
      )}
    </>
  );
};

export default SearchPage;
