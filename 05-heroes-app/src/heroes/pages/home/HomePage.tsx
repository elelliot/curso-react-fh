import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villains"
  >("all");

  // ! No tenemos `state` ni error handling y peor, se ejecuta cada que se monta el componente... React Query es la clave
  // useEffect(() => {
  //   getHeroesByPage().then((heroes) => console.log({ heroes }));
  // }, []);

  const { data: heroesResponse, isLoading } = useQuery({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 Minutos para que no haga nuevas peticiones y nos devuelva el cache antes de que se vuelva obsoleta la data
  });

  if (isLoading) return <p>Cargando heroes...</p>;

  if (heroesResponse)
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
          <Tabs value={activeTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All Characters (16)
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                onClick={() => setActiveTab("favorites")}
              >
                Favorites (3)
              </TabsTrigger>
              <TabsTrigger
                value="heroes"
                onClick={() => setActiveTab("heroes")}
              >
                Heroes (12)
              </TabsTrigger>
              <TabsTrigger
                value="villains"
                onClick={() => setActiveTab("villains")}
              >
                Villains (2)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <h1>Todos los personajes</h1>
              <HeroGrid heroes={heroesResponse.heroes} />
            </TabsContent>
            <TabsContent value="favorites">
              <h1>Favoritos</h1>
              <HeroGrid heroes={[]} />
            </TabsContent>
            <TabsContent value="heroes">
              <h1>Heroes</h1>
              <HeroGrid heroes={[]} />
            </TabsContent>
            <TabsContent value="villains">
              <h1>Villanos</h1>
              <HeroGrid heroes={[]} />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <CustomPagination totalPages={8} />
        </>
      </>
    );
};
