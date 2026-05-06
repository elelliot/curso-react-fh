import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe("ItemCounter test ", () => {
  test("Should render with default values", () => {
    const name = "Test Item";
    render(<ItemCounter name={name} />);

    // Que el texto exista (se puede hacer de las 2 formas)
    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(name)).not.toBeNull();
  });

  test("Should render with custom quantity", () => {
    const name = "Test Item";
    const quantity = 98;
    render(<ItemCounter name={name} quantity={quantity} />);

    // Que sea la cantidad dada
    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("Should increase count when +1 button is pressed", () => {
    const quantity = 1;
    render(<ItemCounter name="Test Item" quantity={quantity} />);

    // Obtenemos el array de botones y agarramos el de sumar
    const [, buttonAdd] = screen.getAllByRole("button");

    // console.log(buttonAdd.innerHTML); // * confirmamos que es el button de `+1`

    // Disparamos el click del boton
    fireEvent.click(buttonAdd);

    expect(screen.getByText("2")).toBeDefined();
  });

  test("Should decrease count when -1 button is pressed", () => {
    const quantity = 5;
    render(<ItemCounter name="Test Item" quantity={quantity} />);

    // Obtenemos el array de botones y agarramos el de sumar
    const [buttonSubstract] = screen.getAllByRole("button");

    // Disparamos el click del boton
    fireEvent.click(buttonSubstract);

    expect(screen.getByText("4")).toBeDefined();
  });

  test("Should NOT decrease count when -1 button is pressed and quantity is 1", () => {
    const quantity = 1;
    render(<ItemCounter name="Test Item" quantity={quantity} />);

    // Obtenemos el array de botones y agarramos el de sumar
    const [buttonSubstract] = screen.getAllByRole("button");

    // Disparamos el click del boton
    fireEvent.click(buttonSubstract);

    expect(screen.getByText("1")).toBeDefined();
  });

  test("Should change to red when count is 1", () => {
    const quantity = 1;
    const name = "Test Item";
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    // No se ve el style, pero el color (que si esta) lo muestra sin pedo
    expect(itemText.style.color).toBe("red");
  });

  test("Should change to black when count is greater than 1", () => {
    const quantity = 2;
    const name = "Test Item";
    render(<ItemCounter name={name} quantity={quantity} />);
    screen.debug();

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe("black");
  });
});
