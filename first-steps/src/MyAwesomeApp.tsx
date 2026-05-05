import type { CSSProperties } from "react";

// NOTE: Si nuestros valores no cambian, es mejor ponerlos fuera del componente, ya que por re-renders, state updates, etc. se actualizan, lo cual no sirve por lo mismo...
const name = "ElBarto";
const lastName = "Sinso";

const favoriteGames = [
  "Cyberpunk 2077",
  "Nier: Automata",
  "Resident Evil",
  "Ryu Ga Gotoku",
];

const isActive = true;

const address = {
  country: "Mexico",
  zipCode: "ABC-123",
};

// NOTE: Los estilos son un poco diferentes por estar en JSX, y usamos el `CSSProperties` type de React para el autocomplete
const myStyles: CSSProperties = {
  backgroundColor: "#a09d9d",
  borderRadius: isActive ? 10 : 20, // Podemos poner estilos condicionales
  padding: 10,
};

// No difference from traditional `function` component to `arrow function` component
export const MyAwesomeApp = () => {
  return (
    <div data-testid="div-app">
      <h1 data-testid="first-name-title">{name}</h1>
      <h3>{lastName}</h3>

      {/* Los arrays se imprimen pegados, asi que mejor usemos el `join` */}
      <p className="mi-clase-favorita">{favoriteGames.join(", ")}</p>
      <p>{2 + 2}</p>

      {/* Booleanos no se imprimen, a menos que lo convirtamos a string */}
      <h1>{isActive ? "Active" : "Inactive"}</h1>

      {/* Los objetos no se imprimen enteros, debemos usar el JSON.stringify por ejemplo */}
      <p style={myStyles}>{JSON.stringify(address)}</p>
    </div>
  );
};
