import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe(" ItemCounter test ", () => {
  test("Should render with default values", () => {
    const name = "Test Item";
    render(<ItemCounter name={name} />);
    screen.debug();

    // Que el texto exista (se puede hacer de las 2 formas)
    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(name)).not.toBeNull();
  });

  test("Should render with custom quantity", () => {
    const name = "Test Item";
    const quantity = 98;
    render(<ItemCounter name={name} quantity={quantity} />);
    screen.debug();

    // Que sea la cantidad dada
    expect(screen.getByText(quantity)).toBeDefined();
  });
});
