import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";

// Cuando el componente se re-renderiza, se vuelve a disparar esta funcion...
const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy Stuff started"); // Debe tener la misma llave (es un key el string)

  for (let index = 0; index < iterationNumber; index++) {
    console.log("YAMERO");
  }

  console.timeEnd("Heavy Stuff started");

  return `${iterationNumber} iteraciones realizadas`;
};

/* NOTE: Memoization (useMemo)
Updates `counter2` -> `heavyStuff` re-runs (normal React behavior).
 
Para evitar eso memorizamos ese valor con `useMemo`

Literal es lo mismo que el `useCallback` pero en vez de memorizar funciones, memorizamos un valor
de retorno.
*/
export const MemoCounter = () => {
  const { counter, decrement, increment } = useCounter(100);
  const { counter: counter2, increment: increment2 } = useCounter(100);

  // const myHeavyValue = heavyStuff(counter);
  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {counter}</h4>
      <h4>Counter2: {counter2}</h4>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={decrement}
      >
        -1
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment2}
      >
        +1 - counter2
      </button>
    </div>
  );
};
