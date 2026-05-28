import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
  page: number, // Page 1 -> offset 0 -------- Page 2 -> offset 6
  limit: number = 6, // El offset se determina por el limit
): Promise<HeroesResponse> => {
  //* page & limit validation, si no es numero, que sea la pagina 1 (No me gusta modificar los argumentos pero meh)
  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 6;
  }

  const { data } = await heroApi.get<HeroesResponse>(`/`, {
    params: {
      limit,
      offset: (page - 1) * limit,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`, // Las imagenes las tranformamos en la url para poder enviar la request y obtenerlas
  }));

  return {
    ...data,
    heroes,
  };
};
