import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

/* Los customHooks pueden retornar array u object, los `states` van antes de los `effects`
   Si pretendemos poner mas de esta logica en otro lugar, mejor reutilizarla con `customHooks`
*/
export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = async (term: string) => {
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    // Remove whitespaces on start and end, and go lowercase
    const term = query.trim().toLowerCase();
    // Query shouldn't be empty (first step helps for this)
    if (!term) return;

    // If term is already included in previousItems, then we do nothing
    if (previousTerms.includes(term)) return;

    // Otherwise we set it to the start of array, only 8 items can be shown so we remove the last item after adding the new one
    setPreviousTerms((prevItems) => {
      prevItems = [term, ...prevItems];
      return prevItems.slice(0, 8);
    });

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
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
