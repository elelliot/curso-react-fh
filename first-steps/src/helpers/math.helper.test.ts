import { describe, expect, test } from "vitest";
import { add, divide, multiply, substract } from "./math.helper";

// `describe` groups tests, can be nested even tho is not that much used
describe("add tests", () => {
  test("Should add two positive numbers", () => {
    // 1. arrange -> Preparar  el test suite (variables, importaciones etc.)
    const a = 1;
    const b = 2;

    // 2. act -> Hacer estimulos
    const result = add(a, b);

    // 3. assert -> Asersiones
    expect(result).toBe(3);
  });
});

describe("substract tests", () => {
  test("Should substract two positive numbers", () => {
    const a = 4;
    const b = 2;

    const result = substract(a, b);

    expect(result).toBe(a - 2);
  });

  test("Should substract two negative numbers", () => {
    const a = -4;
    const b = -2;

    const result = substract(a, b);

    expect(result).toBe(a - b);
  });
});

describe("multiply tests", () => {
  test("Should multiply two numbers", () => {
    const a = 1;
    const b = -2;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test("Should show 0 when multiplying a number by 0", () => {
    const a = 1;
    const b = 0;

    const result = multiply(a, b);

    expect(result).toBe(0);
  });
});

describe("divide tests", () => {
  test("Should divide two positive numbers", () => {
    const a = 2;
    const b = 4;

    const result = divide(a, b);

    expect(result).toBe(a / b);
  });
});
