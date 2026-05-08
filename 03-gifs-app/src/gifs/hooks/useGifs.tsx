import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

/* NOTE: Cachamos los resultados Ejemplo 1
Pero debemos ponerlo fuera del customHook, 
de lo contrario, en cada re-render, se eliminan los valores previos, no se mantienen.

Ejemplo:
Valor inicial `gifsCache` -> {}
Primero Buscamos 1 -> {'1': [...]}
Luego Buscamos '2' -> {'2': [...]}

Osea, el '1' no se mantuvo, pero si lo movemos fuera se mantiene:
{
    '1': [...]
    '2': [...]
}

Otra solucion pudo ser usar un useState para el cache
const gifsCache: Record<string, Gif[]> = {};
*/

/* Los customHooks pueden retornar array u object, los `states` van antes de los `effects`
   Si pretendemos poner mas de esta logica en otro lugar, mejor reutilizarla con `customHooks`

   NOTE: Los `customHooks` tanto como los componentes se re-renderizan al cambiar un `state`
*/
export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  // NOTE: Ejemplo 2 de cache: useRef() -> Mantiene el valor como el useState pero no causa renders
  const gifsCache = useRef<Record<string, Gif[]>>({}); // Tambien puede usarse para acceder a el valor de un elemento HTML...

  const handleTermClicked = async (term: string) => {
    // Si hay cache, retornamos, no queremos obtener gifs por http, si no setear los gifs con los que guardamos en nuestro cache
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]); // Para usar el valor de un `useRef`, hay que acceder con `.current`
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    // Remove whitespaces on start and end, and go lowercase
    const term = query.trim().toLowerCase(); // USE THIS, NOT QUERY
    // Query shouldn't be empty (first step helps for this)
    if (!term) return;

    // If term is already included in previousItems, then we do nothing
    if (previousTerms.includes(term)) return;

    // Otherwise we set it to the start of array, only 8 items can be shown so we remove the last item after adding the new one
    setPreviousTerms((prevItems) => {
      prevItems = [term, ...prevItems];
      return prevItems.slice(0, 8);
    });

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);

    // Guardamos el cache
    gifsCache.current[term] = gifs;
  };

  return {
    // Properties
    gifs,
    previousTerms,

    // Methods/Actions
    handleSearch,
    handleTermClicked,
    setPreviousTerms,
  };
};
