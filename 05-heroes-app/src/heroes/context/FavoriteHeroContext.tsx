import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoriteCount: number;

  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// Podemos establecerle un valor inicial para usar el generic, pero el Provider pide de a fuerza valor inicial, asi que mejor solo lo casteamos con un empty object para no poner el valor inicial 2 veces
// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorite-heroes");
  /* TODO: Validar con Zod la data */
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    // Si existe lo quitamos de favoritos
    if (heroExist) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    // Si no existe lo agregamos
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  // Cada que cambie favorites, se graba en local storage
  useEffect(() => {
    localStorage.setItem("favorite-heroes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    // Antes se veia <FavoriteHeroContext.Provider /> pero ya no es necesario, pero tener en cuenta eso por que es algo nuevo
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
