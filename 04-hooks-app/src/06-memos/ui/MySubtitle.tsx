import { memo } from "react";

interface Props {
  subtitle: string;
  callMyAPI: () => void;
  // callMyAPI: (value: string) => void; // NOTE: Ejemplo SIN useCallback
}

export const MySubtitle = memo(({ subtitle, callMyAPI }: Props) => {
  console.log("MySubtitle Re-Render");

  return (
    <>
      <h6>{subtitle}</h6>

      <button
        className="bg-indigo-500 tewt-white px-2 py-1 rounded-md cursor-pointer"
        onClick={callMyAPI}
        // onClick={() => callMyAPI(subtitle)} // NOTE: Ejemplo SIN useCallback
      >
        Llamar funcion
      </button>
    </>
  );
});
