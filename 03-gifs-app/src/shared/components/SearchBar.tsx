import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Search", onQuery }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Los `effects` solo deben hacer una tarea en especifico, si ocupan mas, mejor crear otro `effect`
  // El effect se ejecuta cada que el componente se monta y despues cuando alguna dependencia cambia

  /* NOTE: Implementamos un `debounce` con useEffect
  1st Stage Initial Effect:
  - La primera vez corre el `setTimeout` y `query` es = "" (a menos que lo actualicemos antes de 700ms ofc)
  - Se limpia el `timeout` despues del `effect`
  
  2nd Stage, Update `query`
  - Si cambiamos el `query`, `onQuery` no se ejecuta hasta despues de 700ms
  GRACIAS a que limpiamos el `timeout`, por tanto no se toma en cuenta para el siguiente efecto.
  Si NO LIMPIAMOS el timeout correria el anterior cosa que no queremos, solo el ultimo.
  */

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    // Cleanup function se ejecuta cada que se corre un efecto o cuando se desmonta el componente
    return () => {
      // Limpiamos el timeOut (asi no se juntan los timeouts anteriores, evitando llamadas innecesarias)
      clearTimeout(timeoutId);
    };
    // Nos dice que `onQuery` debe ser agregado, aunque no cambia eso podria pasar, por eso la agregamos, pero en teoria el unico que cambia es el `query`
  }, [query, onQuery]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
