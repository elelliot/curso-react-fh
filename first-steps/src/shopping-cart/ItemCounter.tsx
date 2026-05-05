import { useState } from "react";

// import "./ItemCounter.css"; // Importamos la clase y la usamos
import styles from "./ItemCounter.module.css"; // CSS Modules debemos usarlo con una variable

interface ItemCounterProps {
  name: string;
  quantity?: number; // `?` hace que la prop sea opcional y `number | undefined` hace que sea obligatoria aunque sea con el valor de `undefined`
}

// React Re-Renderea el componente cuando el `state` o `props` cambian
export const ItemCounter = ({ name, quantity = 1 }: ItemCounterProps) => {
  const [count, setCount] = useState(quantity);
  // setCount(1000) // No usar el `set` asi mero por que al actualizarse se Re-Renderea el component, pero en infinite loop...

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  return (
    // Como esto es JSX, `class` es reservado para la creacion de clases de JS, por eso debemos poner `className`
    // El autocomplete lo obtenemos gracias a la extension de `CSS modules`
    <section className={styles["item-row"]}>
      <span
        className={styles["item-text"]}
        // No podemos hacer styles.red por ejemplo, por que seria como aplicar un objeto completo, si queremos hacer condiciones con css modules, los haremos en el className
        style={{ color: count === 1 ? "red" : "black" }}
      >
        {name}
      </span>
      <button onClick={handleSubstract}>-1</button>
      <span>{count}</span>

      <button onClick={handleAdd}>+1</button>
    </section>
  );
};
