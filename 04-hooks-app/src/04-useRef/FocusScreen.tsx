import { useRef } from "react";

export const FocusScreen = () => {
  // useRef es una variable mutable que no dispara re-renders
  const inputRef = useRef<HTMLInputElement>(null); // Al 1er render la variable apenas es creada y el input aun no existe, por eso va `null` al inicio

  const handleClick = () => {
    inputRef.current?.select(); // Accedemos al valor actual del ref con `current` (algo asi como el ref.value de Vue)
    // inputRef.current?.focus();
  };
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Focus Screen</h1>

      <input
        ref={inputRef}
        type="text"
        className="bg-white text-black px-4 py-2 rounded-md"
        autoFocus
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        Set focus
      </button>
    </div>
  );
};
