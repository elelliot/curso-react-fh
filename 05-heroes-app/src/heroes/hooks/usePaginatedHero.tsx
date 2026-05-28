import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = (page: number, limit: number) => {
  // Regresamos todo el object
  return useQuery({
    // queryKey: ["heroes", "page", page, "limit", limit], //* NOTE: Si por ejemplo les cambiamos de orden ["heroes", "page", +page, "limit", +limit] -> ["heroes", "limit", +limit, "page", +page], para TanStack Query, es una llave diferente
    queryKey: ["heroes", { page, limit }], //* Si la posicion no importa, es mejor usar un object
    queryFn: () => getHeroesByPageAction(+page, +limit), //* Si al queryFn le mandamos argumentos, esos args, deben estar en el query key
    staleTime: 1000 * 60 * 5, // 5 Minutos para que no haga nuevas peticiones y nos devuelva el cache antes de que se vuelva obsoleta la data
  });
};
