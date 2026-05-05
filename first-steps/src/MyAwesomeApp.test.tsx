import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyAwesomeApp } from "./MyAwesomeApp";

/* NOTE:
- Testing de codigo TypeScript o JavaScript per se -> Vitest
- Testing de componentes de React, Vue ,etc. Hooks, composables etc. -> Testing library
*/

describe("MyAwesomeApp", () => {
  test("Should render firstName and lastName", () => {
    // console.log(document.body); // Vitest nos habilita un DOM virtual para testear (no es el mismo de nuestra app como tal, es el de pruebas)

    const { container } = render(<MyAwesomeApp />); // Renderizamos el component para el testing
    // console.log(container.innerHTML); // Obtenemos el HTML del componente renderizado

    // Como el render de HTML no se ve muy amigable en consola, podemos usar `screen` de `testing-library` y con debug() podemos visualizar mejor en consola la info
    // screen.debug();

    const h1 = container.querySelector("h1");
    const h3 = container.querySelector("h3");

    expect(h1?.innerHTML).toContain("ElBarto"); // `toContain` es mas flexible, no es muy preciso tampoco asi que cuidado con eso. `toBe` es mas estricto, tiene que ser exacto
    expect(h3?.innerHTML).toContain("Sinso");
  });

  /* NOTE: 
  - Si queremos probar un estado inicial o sin estado manipulado por eventos -> `container`
  - Si queremos probar estados en base a eventos y que el DOM se actualiza por lo mismo -> `screen`

  `container` no captura los updates del DOM, solo su estado inicial, pero `screen` si, ademas con debug() lo vemos de forma mas amigable el HTML
  */
  test("Should render firstName and lastName -- screen", () => {
    render(<MyAwesomeApp />); // Renderizamos

    screen.debug(); // Aqui podriamos capturar actualizaciones en el DOM

    // Podemos buscar elementos con `screen` si no queremos usar el container
    // const h1 = screen.getByRole("heading", { level: 1 }); // level-> 1 seria busca los `h1`, si hay duplicados tira error

    // * Tambien podemos buscar por data-[testid] en el elemento (no es muy recomendado hacer lo del testId, pero a veces saca del apuro, pero la idea es no usarla para tener el HTML mas limpio por que si lo borran, fallan los test pero la app no y es dificil debuggear eso)
    const h1 = screen.getByTestId("first-name-title");
    console.log(h1.innerHTML);
  });

  test("Should match snapshot", () => {
    // Con los snapshots podemos basicamente poner un candado al HTML para que se vea como queremos y actualizarlo en caso de haber cambios

    const { container } = render(<MyAwesomeApp />);

    /* NOTE: Crea un snapshot si no existe y lo compara con el container, si es el mismo contenido exactamente, pasa la assertion
    Si el cambio es correcto, entonces actualizamos el Snapshot (la consola nos dice como)
    * Los Snapshots si van en el Repo
    */
    expect(container).toMatchSnapshot();
  });

  test("Should match snapshot - screen", () => {
    // * `screen` no devuelve el HTML como `container`, `debug()` solo permite visualizarlo en consola
    render(<MyAwesomeApp />);
    expect(screen.getByTestId("div-app")).toMatchSnapshot();
  });
});
