import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonById = async (id: number) => {
    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    console.log(data);
    setPokemon({
      id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
    setIsLoading(false);
  };

  // En el custom hook trigereamos el effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPokemonById(id);
  }, [id]);

  return {
    // Properties
    isLoading,
    pokemon,

    //
    formattedId: id.toString().padStart(3, "0"), // Agrega 0's para que mantenga 3 caracteres al `id` del pokemon
  };
};
