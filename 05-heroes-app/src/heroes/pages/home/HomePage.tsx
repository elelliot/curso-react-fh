import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";

export const HomePage = () => {
  //* Podriamos hacer un custom hook con los searchParams y el page y limit
  // React Router `useSearchParams()` hook, en lugar de usar `useState` para manejar state con la URL
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  // Validamos el valor de activeTab para que la app no se rompa si alguien pone cualquier wea
  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];

    return validTabs.includes(activeTab) ? activeTab : "all"; // Si no es valido, el searchParam se sigue viendo con lo que pusieron, pero maneja el valor de `all` y asi no se rompe nada
  }, [activeTab]);

  //* Con lo de arriba nos deshacemos del useState, y el tab controller lo manejamos con la url y el hook

  const { data: heroesResponse, isLoading } = usePaginatedHero(
    +page,
    +limit,
    category,
  );
  const { data: summary, isLoading: isLoadingSummary } = useHeroSummary();

  if (isLoading && isLoadingSummary) return <p>Cargando heroes...</p>;

  if (heroesResponse && summary)
    return (
      <>
        <>
          {/* Header */}
          <CustomJumboTron
            title="Universo de SuperHeroes"
            description="Descubre, explora y administra super heroes y villanos"
          />

          {/* Breadcrumbs */}
          <CustomBreadCrumbs currentPage="SuperHeroes" />

          {/* Stats Dashboard */}
          <HeroStats />

          {/* Tabs */}
          <Tabs value={selectedTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="all"
                onClick={() =>
                  /* Seteamos el nuevo param como si fuera useState, con un callback para poder mantener las params anteriores
                  Ya que si por ejemplo tuvieramos mas params (?tab=all&offset=10) al hacerlo de la forma basica, perderiamos los params
                  anteriores. De esta forma los preservamos
                  */
                  setSearchParams((prev) => {
                    prev.set("tab", "all");
                    prev.set("category", "all");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                All Characters ({summary.totalHeroes})
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "favorites");
                    // prev.set("category", "favorites");
                    return prev;
                  })
                }
              >
                Favorites (3)
              </TabsTrigger>
              <TabsTrigger
                value="heroes"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "heroes");
                    prev.set("category", "hero");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Heroes ({summary.heroCount})
              </TabsTrigger>
              <TabsTrigger
                value="villains"
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("tab", "villains");
                    prev.set("category", "villain");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Villains ({summary.villainCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <h1>Todos los personajes</h1>
              <HeroGrid heroes={heroesResponse.heroes} />
            </TabsContent>
            <TabsContent value="favorites">
              <h1>Favoritos</h1>
              {/* <HeroGrid heroes={heroesResponse.heroes} /> */}
            </TabsContent>
            <TabsContent value="heroes">
              <h1>Heroes</h1>
              <HeroGrid heroes={heroesResponse.heroes} />
            </TabsContent>
            <TabsContent value="villains">
              <h1>Villanos</h1>
              <HeroGrid heroes={heroesResponse.heroes} />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <CustomPagination totalPages={heroesResponse.pages ?? 1} />
        </>
      </>
    );
};
