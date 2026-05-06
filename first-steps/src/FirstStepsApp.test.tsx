import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";

//---------------------------------------------------------------------
// Arrange -> Preparamos mock de componente (Ejemplo 1)
/* NOTE: 
    -Si montamos <FirstStepsApp>, <ItemCounter> se monta tambien, podria ser que llame componentes dentro y aunque no es el caso,
    para evitar ese escenario, creamos un `Mock` de ItemCounter, asi podemos llamar al componente como nosotros queramos.
    
    El `Snapshot` va dar error por que desde el Mock, ya no renderizamos el ItemCounter (actualizar el snapshot para verificar).
    
    - Normalmente cuando mandamos llamar 
        -> import { ItemCounter } from "./shopping-cart/ItemCounter";
        * En este caso por ser un Named Export y no Default Export, regresamos `ItemCounter` en el callback.
        Eso es lo que debemos poner en el callback del mock y que regrese lo que digamos...
    
    * El mock basicamente dice:
        Cuando se llame a ("./shopping-cart/ItemCounter"), el callback es el lo que regresamos
*/

//? Se pueden recibir las props y de esta forma podriamos hacer evaluaciones... PERO, podemos tambien definir este componente afuera usando `vi.fn()`
// vi.mock("./shopping-cart/ItemCounter", () => ({
//   ItemCounter: (props: unknown) => (
//     <div
//       data-testid="ItemCounter"
//       name={props.name}
//       quantity={props.quantity}
//     />
//   ),
// }));
//---------------------------------------------------------------------

//* Arrange -> Preparamos mock de componente (Ejemplo 2 usando `fn()` para definir el componente fuera del mock)
/*
NOTE: fn() nos permite:
- Saber con que argumentos fue llamada la funcion ficticia (en este caso el componente)
- Cuantas veces fue llamado
- Simular returns
etc.
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockItemCounter = vi.fn((_props: unknown) => {
  return <div data-testid="ItemCounter" />; // Aqui no mandamos las props... por eso no llegan en el mock
});

vi.mock("./shopping-cart/ItemCounter", () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

describe("FirstStepsApp test ", () => {
  /*
    Como cada prueba renderiza el <FirstStepsApp /> se llaman varias veces el mock, por tanto eso afecta a la siguiente prueba
    Por tanto debemos limpiar los mocks despues de cada prueba.
    */
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should match snapshot", () => {
    const { container } = render(<FirstStepsApp />);
    expect(container).toMatchSnapshot();
  });

  test("Should render the correct number of ItemCounter components", () => {
    render(<FirstStepsApp />);

    // Obtenemos los ItemCounters los cuales deberian ser 3 por los items declarados en `itemsInCart` de `FirstStepsApp`
    const itemCounters = screen.getAllByTestId("ItemCounter");

    // Esperamos que sean 3
    expect(itemCounters.length).toBe(3);
  });

  test("Should render ItemCounter with correct Props", () => {
    render(<FirstStepsApp />);
    // screen.debug()
    // Que sea llamado 3 veces el mock, por que son 3 `ItemCounter` los que se renderean (por lo menos gracias a los items que se mandan)
    expect(mockItemCounter).toHaveBeenCalledTimes(3);
    // Que sea llamado con los valores correctos (los que mandamos con `itemsInCart`)
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Nintendo Switch 2",
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Pro Controller",
      quantity: 2,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Super Smash",
      quantity: 5,
    });
  });
});
