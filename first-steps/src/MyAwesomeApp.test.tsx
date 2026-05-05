import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyAwesomeApp } from "./MyAwesomeApp";

/* NOTE:
- Testing de codigo TypeScript o JavaScript per se -> Vitest
- Testing de componentes de React, Vue ,etc. Hooks, composables etc. -> Testing library
*/

describe("MyAwesomeApp", () => {
  test("Should render firstName and lastName", () => {
    // console.log(document.body); // Vitest nos habilita un DOM virtual para testear (no es el mismo de nuestra app como tal, es el de pruebas)

    // const { container } = render(<MyAwesomeApp />); // Renderizamos el component para el testing (que se pueda usar por consola)
    // console.log(container.innerHTML); // Obtenemos el HTML del componente, lo que renderiza

    // Como el render de HTML no se ve muy amigable en consola, podemos usar `screen` de `testing-library` y con debug() podemos visualizar mejor en consola la info
    render(<MyAwesomeApp />); // Renderizamos
    screen.debug();
  });
});
